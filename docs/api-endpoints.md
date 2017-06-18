```js
{
  user: {
    id: 1,
    username: "zackyang",
    name: "Zack Yang"
  },
  boards: {
    1: {
      name: "Japan Trip",
      private: false,
      creator_id: 1
    }
  },
  lists: {
    1: {
      name: "To Do"
    },
    2: {
      name: "Completed"
    }
  },
  cards: {
    1: {
      1: {
        name: "Buy plane tickets",
        list_id: 1
      },
      2: {
        name: "Renew passports",
        list_id: 1
      }
    },
    2: {
      3: {
        name: "Set travel dates",
        list_id: 2
      }
    }
  },
  cardDetail: {
    name: "Buy plane tickets",
    description: "We need to buy plane tickets to get there.",
    due_date: "Sun Apr 16 2017 16:32:13 GMT-0400 (EDT)"
  },
  comments: {
    1: {
      body: "Which airline?",
      author_id: 1
      },
    2: {
      body: "The cheapest, probably...",
      author_id: 2
    }
  }
}
```
