```js
    goSearch(e) {
        const element = e.target
        let { categoryname, category1id, category2id, category3id } = element.dataset
        if (categoryname) {
            let location = { name: "search" }
            let query = { categoryName: categoryname }
            if (category1id) {
                query.category1Id = category1id
            } else (category2id) {
                query.category2Id = category2id
            } else {
                query.category3Id = category3id
            }
            location.query = query
            this.$router.push(location)
        }
    }

```

```js
    mounted() {
        this.$router.push({
            // path: "/search",
            name: "search",
            query: {
                K: this.keyWord.toUpperCase()
            },
            params: {
                keyWord: ""||undefined
            }
        })
    }
```
