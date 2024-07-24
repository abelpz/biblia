import { useContext, useEffect, useState } from "react";
import { Text, ActivityIndicator } from "react-native-paper";
import { ProskommaContext } from "../../context/proskommaContext";
import { I18nContext } from "../../context/i18nContext";
import { ScrollView, View } from "react-native";
import { ColorThemeContext } from "../../context/colorThemeContext";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { useDocumentQuery } from "../renderer/textComponentRender/RenderText";
import { renderDoc } from "../renderer/textComponentRender/RenderText";
import { renderers } from "../renderer/utils/renderReactNative";

export default function BottomSheetIntroInfo({ docSetId, shown }) {
  const { pk } = useContext(ProskommaContext);
  const { i18n } = useContext(I18nContext);
  const [info, setInfo] = useState(null);
  const { colors, theme } = useContext(ColorThemeContext);

  const [introComponent, setIntroComponent] = useState(null);
  const [intro, setIntro] = useState(null);
  const [loading, setLoading] = useState(false);

  const option = {
    showWordAtts: false,
    showTitles: true,
    showHeadings: true,
    showIntroductions: true,
    showFootnotes: true,
    showXrefs: false,
    showParaStyles: true,
    showCharacterMarkup: false,
    showVersesLabels: true,
    showChapterLabels: true,
    fontConfig: {
        fontFamily: 'NotoSans',
        fontSize: 4,
      },
    excludeScopeTypes: ["milestone", "attribute", "spanWithAtts"],
    bcvNotesCallback: (bcv) => {},
    renderers,
  };

  useEffect(() => {
    if (intro?.data?.document?.id) {
      const result = renderDoc(intro, pk, option);
      setIntroComponent(result.paras);
      setLoading(false);
    } else {
      setIntroComponent(
        <Text style={{ padding: 16 }} variant="bodyLarge">
          {i18n.t("noIntro")}
        </Text>
      );
      setLoading(false);
    }
  }, [intro]);

  useEffect(() => {
    if (docSetId) {
      const fetchDocument = async () => {
        setLoading(true);
        const result = await useDocumentQuery("FRT", docSetId, pk);
        setIntro(result);
      };
      fetchDocument();
    }
  }, [docSetId]);

  useEffect(() => {
    setLoading(true);
    getTags(pk, docSetId).then((e) => {
      setInfo(e);
      setLoading(false);
    });
  }, [docSetId]);

  return (
    <BottomSheetView style={{ paddingHorizontal: 16, gap: 12 }}>
      <Text variant="titleMedium">{i18n.t("about")}</Text>
      <View
        style={{
          gap: 10,
          padding: 16,
          backgroundColor: colors.schemes[theme].secondaryContainer,
          borderRadius: 12,
        }}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          info && (
            <>
              <Text variant="headlineSmall">{info[0].split(":")[1]}</Text>
              <View style={{ gap: 24, paddingLeft: 24, flexDirection: "row" }}>
                <View>
                  <Text variant="labelLarge">{i18n.t("language")}</Text>
                  <Text variant="labelLarge">{i18n.t("edition")}</Text>
                  <Text variant="labelLarge">{i18n.t("copyright")}</Text>
                </View>
                <View>
                  <Text variant="labelLarge">{info[2].split(":")[1]}</Text>
                  <Text variant="labelLarge">{info[3].split(":")[1]}</Text>
                  <Text variant="labelLarge">{info[1].split(":")[1]}</Text>
                </View>
              </View>
            </>
          )
        )}
      </View>
      <Text variant="titleMedium">{i18n.t("introductionBook")}</Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView
          style={{
            backgroundColor: colors.schemes[theme].surfaceContainerHighest,
            padding: 16,
            borderRadius: 12,
          }}
        >
          {introComponent}
        </ScrollView>
      )}
    </BottomSheetView>
  );
}

async function getTags(pk, docSetId) {
  try {
    const response = await pk.gqlQuery(`{
        docSet(id: "${docSetId}"){
          tags
        }
      }`);
    const tags = response.data.docSet.tags.filter((e) =>
      ["language", "title", "owner", "copyright"].includes(e.split(":")[0])
    );
    return tags;
  } catch (error) {
    console.error("Error fetching next chapter:", error);
    return null;
  }
}
