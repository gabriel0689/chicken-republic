# chicken-republic

## Built with VueJs and Firebase

```
https://chicken-republic.firebaseapp.com
```

### Vue plugins used

```
1. vue router
2. vuex
3. vuetify

```

### Firestore Schema

```
-- menu (root collection)
    XXX (document)
        ++ category <string>
        ++ image <string>
        ++ menuItemId <string>
        ++ name <string>
        ++ price <number>
    ...
-- users (root collection)
    XXX (document)
        ++ address <string>
        ++ firstName <string>
        ++ lastName <string>
        ++ phoneNumber <number>
        ++ zipCode <number>
        -- orders (subcollection)
            XXX (document)
                ++ item <array>
                ++ orderDate <timestamp>
                ++ total <number>
    ...
-- orders (root collection)
    XXX (document)
        ++ items <array>
        ++ address <string>
        ++ firstName <string>
        ++ lastName <string>
        ++ phoneNumber <number>
        ++ zipCode <number>
        ++ orderDate <timestamp>
        ++ total <number>
    ...
```
