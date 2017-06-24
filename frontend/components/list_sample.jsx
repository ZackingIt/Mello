this.props.lists.map(list) {
  return (
    <ListComponent
      list=list
      cards=this.props.cards
    />
  )
}

const ListComponent = functionReAct() {
     render() {
     const cards = this.props.list.cardIds.map(cardId) {
       const currentCard = this.props.cards[cardId];
       return (
         <div>currentCard.title</div>
       )
     }
    return (
      <div>
        <div>{this.props.list.title}</div>
        <div>{cards}</div>
      </div>
    )
   }
}





//   render(){
//     const {board, lists, cards} = this.props;
//     // //console.log("PROPS");
//     // //console.log(this.props);
//     // if we haven't fetched the board yet, it won't have all of its information
//     // some of these keys may be undefined until after the fetch comes back
//     // set reasonable defaults, either here or in the container
//
//     var boardTitle = "";
//     if (board){
//       boardTitle = <button className="board-show-title"> {board["title"]} </button>;
//     }
//     var cardBodyArray = [];
//     var wholeCardArray = [];
//     if (Object.values(cards).length > 0){
//         cardBodyArray = Object.values(cards).map( (card) => {
//         return <button className="board-show-card-item"> {card["body"]} </button>;
//       });
//     }
//     debugger
//
//     let localListOfCards = []
//     if (Object.values(cards).length > 0){
//       for (let key in cards) {
//         if (cards[key].list_id === 1){
//           localListOfCards.push(cards[key]);
//         }
//       }
//     }
//     //console.log(this.props);
//     if (Object.values(lists).length > 0){
//       var listTitleArray = Object.values(lists).map( (list) => {
//
//          <button className="board-show-list-item">{list["title"]} {
//            cardBodyArray
//         } </button>;
//       });
//     }
//
//     return (
//       <div className="board-show-container">
//         <section className="board-show-title-container">
//           {boardTitle}
//         </section>
//
//         <section className="board-show-list-container">
//           {listTitleArray}
//         </section>
//
//         <section className="board-show-card-container">
//           {cardBodyArray}
//         </section>
//       </div>
//     );
//   }
// }
