## Component Hierarchy (MVP)

**AuthForm**
  - Greeting

**App**
  - Header
  - Router
    - BoardIndex
    - BoardShow

**Header** ________________ mapStateProps: header
  - BoardMenuDropdown _____ passed Props: header.boards
  - NewBoardDropdown
  - UserMenuDropdown ______ passed Props: header.user
  - Search (later)

**BoardIndex** ____________ mapStateProps: boardIndex
  - BoardLink _____________ passed Props: boardIndex.data (element)
  - CreateBoardDropdown

**BoardShow** _____________ mapStateProps: boardShow
  - List __________________ passed Props: boardShow.data.lists (element)
  - CreateList ____________ passed Props: boardShow.data.id

**List** _________________ passed Props: list (from boardShow.data.lists (element))
  - Card _________________ passed Props: list.cards (element)
  - NewCardDropdown ______ passed Props: list.id

**Card** _________________ passed Props: card (from list.cards (element))
  - CardDetailModal ______ mapStateProps: cardModal

**CardDetailModal**
  - NewCommentBox ________ passed Props: card.id
  - CommentIndex _________ passed Props: cardModal.data.comments

### Routes
  Path               | Component    |
  -------------------|--------------|
  /signup            | Greeting     |
  /signin            | Greeting     |
  /home              | BoardIndex   |
  /home/:id          | BoardShow    |
