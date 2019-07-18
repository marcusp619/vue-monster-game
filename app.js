new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    playerDamageTaken: null,
    monsterDamageTaken: null,
    eventHistory: []
  },
  methods: {
    startGame: function () {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.eventHistory = [];
      this.gameIsRunning = true;
    },
    attack: function () {
      let damageTaken = this.calcDamage(15, 19);
      this.playerHealth -= damageTaken;
      if (this.checkWin()) return;
      this.monsterAttack();
      this.checkWin();
      this.eventHistory.unshift({ player: true, log: `You took ${damageTaken}!` });
    },
    monsterAttack: function (min=10, max=15) {
      let damageTaken = this.calcDamage(min, max);
      this.monsterHealth -= damageTaken;
      this.eventHistory.unshift({ player: false, log: `Monster took ${damageTaken}!` });
    },
    specialAttack: function () {
      let damageTaken = this.calcDamage(10, 15);
      this.playerHealth -= damageTaken;
      this.eventHistory.unshift({ player: true, log: `You took ${damageTaken}!` });
      if (this.checkWin()) return;
      this.monsterAttack(19, 25);
      this.checkWin();
    },
    checkWin: function () {
      if (this.monsterHealth <= 0) {
        if (confirm('You won! New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      if (this.playerHealth <= 0) {
        if (confirm('You lost! New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    },
    heal: function () {
      let addedHealth = Math.round(Math.random() * 10) + 5;
      this.playerHealth < 90 ?
        this.playerHealth += addedHealth :
        null;
      this.eventHistory.unshift({ player: true, log: `Player healed for ${addedHealth}` });
    },
    giveUp: function () {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.eventHistory = [];
      this.gameIsRunning = false;
    },
    calcDamage: function (min, max) {
      return Math.round(Math.random() * (max - min)) + min;
    }
  }
})