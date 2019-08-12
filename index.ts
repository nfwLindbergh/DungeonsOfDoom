import "./style.css";

window.onload = function() {
  class Game {
    player: Player;
    monsterList: Monster[];
    playerIds: NodeListOf<HTMLInputElement>;
    monsterIds: NodeListOf<HTMLInputElement>;
    logCount: string;
    constructor() {
      /**Här deklarerar vi alla variabler som behövs i spelet.
       * Behövs playerIds & monsterIds?
       */
      this.monsterList = [];
      this.player = null;
      this.playerIds = null;
      this.monsterIds = null;
      this.logCount = "";
    }

    beginFight() {
      /**Se kommentarer i main längst ner. */
      this.monsterList[0].health =
        this.monsterList[0].health - this.player.strength;
      this.monsterIds[2].value = this.monsterList[0].health.toString();
      if (this.monsterList[0].health <= 0) {
        this.logCount =
          this.logCount + ("The " + this.monsterList[0].name + " died<br>");
        this.removeMonster();
        this.upDateMonsterValue();
      }
    }

    updatePlayerValues() {
      /**PlayerIds är listan av playertextfälten.
       */
      this.playerIds = document.querySelectorAll("#player > input");
      this.playerIds[0].value = this.player.name.toString();
      this.playerIds[1].value = this.player.strength.toString();
      this.playerIds[2].value = this.player.health.toString();
    }

    upDateMonsterValue() {
      /**MonsterIds är listan av monstertextfälten.
       * MonsterList[0] är det monster som är "current" i fight.
       */
      this.monsterIds = document.querySelectorAll("#monster > input");
      if (this.monsterList.length > 0) {
        this.monsterIds[0].value = this.monsterList[0].name.toString();
        this.monsterIds[1].value = this.monsterList[0].strength.toString();
        this.monsterIds[2].value = this.monsterList[0].health.toString();
      } else {
        alert("You won! All monsters are dead!");
      }
    }
    removeMonster() {
      /**monsterList.shift tar bort första monstret ur arrayn,
       *  vilket gör att "current" monster i fight alltid är [0]. */
      this.monsterList.shift();
    }
  }

  interface Character {
    name: string;
    health: number;
    strength: number;
  }

  class Monster implements Character {
    constructor(
      public name: string,
      public health: number,
      public strength: number
    ) {
      this.name = name;
      this.health = health;
      this.strength = strength;
    }
  }

  class Player implements Character {
    constructor(
      public name: string,
      public health: number,
      public strength: number
    ) {
      this.name = name;
      this.health = health;
      this.strength = strength;
    }
  }

  class InputReader {
    /**Här är det första som händer i spelet.
     * Vi läser in all input ifrån .html
     * En klass med funktionalitet att skapa spelare och monster.
     * Den här metoderna hjälper bara till att sedan skapa en player/monster i Game-klassen.*/

    constructor() {}

    static readInAndCreatePlayer(game: Game) {
      /**Vi kallar på #playerData i .html för att få tillgång till playerInput.
       * Vi har gjort den static för att input-reader inte behöver några objekt utan endast metoder. */
      let playerInput: HTMLInputElement = document.querySelector("#playerData");
      game.player = new Player(
        playerInput.dataset.name,
        parseInt(playerInput.dataset.health, 10),
        parseInt(playerInput.dataset.strength, 10)
      );
    }

    static readInAndCreateMonster(game: Game) {
      let monsters: NodeListOf<HTMLElement> = document.querySelectorAll(
        "#monsters > input"
      );
      /**Vi använder en for-loop eftersom att det finns flera monster. Annars se ovan. */
      monsters.forEach(function(monsterInput) {
        game.monsterList.push(
          new Monster(
            monsterInput.dataset.name,
            parseInt(monsterInput.dataset.health, 10),
            parseInt(monsterInput.dataset.strength, 10)
          )
        );
      });
    }
  }

  var game = new Game(); //Här skapar vi ett nytt game-objekt.
  InputReader.readInAndCreateMonster(game); //Här kallar vi metoden som läser in info och skapar en monsterlista tillhörande game.
  InputReader.readInAndCreatePlayer(game); //Se ovan fast för spelare. Vi skickar in game som parameter för att nå arrayn monsterList i game-objektet.

  game.updatePlayerValues(); //Game kallar sin egen metod för att kunna jobba med sin data direkt som finns i sin klass.
  game.upDateMonsterValue(); //Se ovan. Det är här vi uppdaterar text-boxarna som finns i .html med information ifrån game och dess variabler. T ex game.monsterList.

  var fightButton: HTMLElement = document.querySelector("#fight"); //Här deklarerar vi knappen "FIGHT!" som finns i .html för att kunna tilldela den en funktion.
  var fightLog: HTMLElement = document.querySelector("#console");

  fightButton.onclick = function() {
    game.logCount =
      game.logCount +
      "POW!!! <br>" +
      "- " +
      game.player.name +
      " bitch-slapped " +
      game.monsterList[0].name +
      " and gave " +
      game.player.strength +
      " damage <br>" +
      game.monsterList[0].name +
      ": OW! *cries*<br>";
    game.beginFight();
    fightLog.innerHTML = game.logCount;

    /**Här nere kommer funktionen .onclick till knappen "FIGHT!" som vi deklarerade ovan.
     * Det som sker nedan är det som kommer att skicka när vi trycker på knappen "FIGHT!".
     */
    /*game.monsterList[0].health =
      game.monsterList[0].health - game.player.strength; // Monstrets hälsa - players styrka = monstrets nya hälsa.
    game.monsterIds[2].value = game.monsterList[0].health; //MonsterId refererar till textboxens värde och uppdaterar monstrets nya hälsovärde.
    if (game.monsterList[0].health <= 0) {
      //If-satsen kollar efter om monstret har någon "health" kvar. Om så inte är fallet: se nedan.
      alert("The " + game.monsterList[0].name + " died"); // alert genererar en pop-upruta som talar om att monstret har gått ur tiden och inte längre är med oss.
      game.removeMonster(); // Begravningen är inställd och vi plockar bort det framlidne monstret infrån arrayen.
      game.upDateMonsterValue(); // game kallar på sin egen metod för att uppdatera textboxarna med värden för den nya kombatanten.
    }*/
  };
};
