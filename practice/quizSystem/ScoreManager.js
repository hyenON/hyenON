class ScoreManager {
    constructor(answers) {
        this.answers = answers; // 정답 배열 (true/false)
    }

    calculateScore() {
        let correctAnswers = this.answers.filter(answer => answer === true).length; // 맞춘 개수
        return correctAnswers * 5; // 문제당 5점 계산
    }
}

module.exports = ScoreManager; // 모듈로 내보내기
