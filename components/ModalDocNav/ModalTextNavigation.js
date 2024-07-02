import { Portal, Modal, Divider } from "react-native-paper";
import { TouchableOpacity, View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { useState, useContext, useEffect } from "react";
import { ProskommaContext } from "../../context/proskommaContext";

export default function ModalTextNavigation({
  documentResult,
  visible = false,
  setVisible,
}) {
  const { pk } = useContext(ProskommaContext);
  const [book, setBook] = useState("TIT");
  const [chapter, setChapter] = useState(1);
  const [verse, setVerse] = useState(1);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await getData(pk,'xenizo_psle_1');
      setData(result);
    }

    fetchData();
  }, [documentResult]);


  if (!visible) return null;

  return (
    <Portal>
      <Modal
        onDismiss={() => setVisible(false)}
        visible={visible}
        contentContainerStyle={styles.container}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.title}>
            <Text variant="headlineSmall">Naviguer Vers</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              height: 20,
              marginBottom: 24,
            }}
          >
            <View style={styles.columnTitle}>
              <Text style={styles.columnTitleText} variant="bodyMedium">
                Livre
              </Text>
            </View>
            <View style={styles.columnTitle}>
              <Text style={styles.columnTitleText} variant="bodyMedium">
                Chapitre
              </Text>
            </View>
            <View style={styles.columnTitle}>
              <Text style={styles.columnTitleText} variant="bodyMedium">
                Verset
              </Text>
            </View>
          </View>
          <View style={styles.columnsContainer}>
            <View style={styles.column}>
              <ScrollView>
                {data?.map((e, id) => (
                  <TouchableOpacity
                    style={
                      book === e.headers.filter(p => p.key === 'bookCode')[0].value
                        ? [{ backgroundColor: "rgba(199, 197, 208, 1)" }, styles.chipContainer]
                        : [styles.chipContainer]
                    }
                    onPress={() => setBook(e.headers.filter(p => p.key === 'bookCode')[0].value)}
                    key={id}
                  >
                    <Text 
                    style={{color:'rgba(73, 69, 79, 1)'}}
                    variant="labelMedium">{e.headers.filter(p => p.key === 'toc2')[0]?.value}</Text>
                    <Text variant="bodyLarge">{e.headers.filter(p => p.key === 'bookCode')[0].value}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.column}>
              <ScrollView>
                {data?.find((e) => e.headers.filter(p => p.key === 'bookCode')[0].value === book)
                  ?.cvIndexes.map((e, id) => (
                    <TouchableOpacity
                      onPress={() => setChapter(e.chapter)}
                      style={
                        chapter === e.chapter
                          ? [{ backgroundColor: "rgba(199, 197, 208, 1)" }, styles.chipContainer]
                          : [styles.chipContainer]
                      }
                      key={id}
                    >
                      <Text variant="bodyLarge">{e.chapter}</Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.column}>
              <ScrollView>
                {data?.find((e) => e.headers.filter(p => p.key === 'bookCode')[0].value === book)
                  ?.cvIndexes.find((e) => e.chapter === chapter)
                  ?.verseRanges.map((e, id) => (
                    <TouchableOpacity
                      style={
                        book === e.numbers[0]
                          ? [{ backgroundColor: "grey" }, styles.chipContainer]
                          : [styles.chipContainer]
                      }
                      onPress={() => setVerse(e.numbers[0])}
                      key={id}
                    >
                      <Text variant="bodyLarge">{e.numbers[0]}</Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 68,
    justifyContent: "center",
    marginHorizontal: 18,
    marginBottom: 132,
    backgroundColor: "rgba(234, 231, 239, 1)",
    borderRadius: 28,
  },
  title: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  columnsContainer: {
    flexDirection: "row",
    flex: 1,
  },
  column: {
    flex: 1,
  },
  columnTitle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  columnTitleText: {
    color: "rgba(70, 70, 79, 1)",
  },
  divider: {
    width: 1,
    height: "100%",
  },
  chipContainer: {
    height: 56,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});

async function getData(pk, docSetid) {
  const documents = await pk.gqlQuerySync(`{
    docSet(id: "${docSetid}"){
      documents {
        headers{
        key
        value
        }
        cvIndexes {
          chapter
          verseRanges {
            numbers
          }
        }
      }
    }
  }`).data?.docSet?.documents

  console.log(documents?.map(e => e.headers.filter(p => p.key === 'toc2')))

  return documents;
};

