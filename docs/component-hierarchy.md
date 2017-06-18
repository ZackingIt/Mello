## Component Hierarchy (MVP)

**AuthForm**
  - Greeting

**App**
  - Header
  - Router
    - BoardIndex
    - BoardShow

**Header**
  - BoardMenuDropdown
  - NewBoardDropdown
  - UserMenuDropdown
  - Search (later)

**BoardIndex**
  - BoardLink
  - CreateBoardDropdown

**BoardShow**
  - List
  - CreateList

**List**
  - Card
  - NewCardDropdown

**Card**
  - CardDetailModal

**CardDetailModal**
  - NewCommentBox
  - CommentIndex
