Workflow

App loading:

1. Load fonts asynchronously
2. Load Bible version number from AsyncStorage
3. Check internet connectivity
4. If connected:
   - Fetch latest Bible version release date from the server
   - Compare with local version release date
   - If different:
     a. Download new Bible version
     b. Save to FileSystem
     c. Update version number in AsyncStorage
5. Load Bible from FileSystem
6. Load Bibles into Proskomma (pk)
7. Initialize app UI