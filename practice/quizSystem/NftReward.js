class NFTReward {
  constructor() {}

  getReward(score) {
    if (score >= 75) {
      return "💎 플레티넘";
    } else if (score >= 50) {
      return "🥇 골드";
    } else if (score >= 25) {
      return "🥈 실버";
    } else {
      return "🥉 브론즈";
    }
  }
}

module.exports = NFTReward; // NFTReward 클래스를 내보냄
