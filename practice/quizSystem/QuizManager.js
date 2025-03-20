// QuizManager 메서드

// ★ startQuiz() → 퀴즈 시작
// ★ askQuestion() → 문제 출력
// ★ submitAnswer(answer) → 사용자의 답변 받기
// ★ checkAnswer() → 정답 체크
// ★ getFinalScore() → 최종 점수 반환
// ★ assignNFT() → NFT 등급 배정

const QuestionBank = require("./QuestionBank"); // 문제 관리 클래스
const Timer = require("./Timer"); // 타이머 클래스
const ScoreManager = require("./ScoreManager"); // 점수 계산 클래스
const NftReward = require("./NftReward"); // NFT 보상 클래스

class QuizManager {
    constructor(csvPath) {
        this.questionBank = new QuestionBank(csvPath); // 문제 관리 인스턴스
        this.timer = new Timer(); // 타이머 인스턴스
        this.scoreManager = new ScoreManager(); // 점수 계산 인스턴스
        this.nftReward = new NftReward(); // NFT 보상 인스턴스
        this.questions = this.questionBank.getRandomQuestions(); // 랜덤 문제 가져오기
        this.currentQuestionIndex = 0; // 현재 문제 인덱스
        this.score = 0; // 사용자 점수
    }

    // 퀴즈 시작
    startQuiz() {
        console.log("🚀 OX 퀴즈 시작! O 또는 X 키를 눌러 정답을 선택하세요.");
        this.timer.startTimer(); // 타이머 시작
        this.askQuestion();
    }

    // 문제 출력
    askQuestion() {
        if (this.currentQuestionIndex < this.questions.length) {
            const question = this.questions[this.currentQuestionIndex];
            console.log(`Q${this.currentQuestionIndex + 1}: ${question.문제} (O/X)`);
            
            // 🛠 이전 타이머 중지
            this.timer.stopTimer();
    
            // 🛠 타이머 실행 시 콜백 추가 (시간 초과 시 자동으로 다음 문제로 이동)
            this.timer.startTimer(() => {
                console.log("⏰ 시간 초과! 다음 문제로 이동합니다.");
                this.currentQuestionIndex++;
                this.askQuestion(); // 다음 문제 출력
            });
    
        } else {
            this.endQuiz(); // 퀴즈 종료
        }
    }

    // 사용자가 정답 제출
    submitAnswer(answer) {
    this.timer.stopTimer(); // 🛠 정답을 입력하면 타이머 중지

    const question = this.questions[this.currentQuestionIndex];
    const correctAnswer = question.정답.trim().toUpperCase();

    if (answer === correctAnswer) {
        console.log("✅ 정답입니다!");
        this.score += 5; // 정답 맞히면 5점 추가
    } else {
        console.log(`❌ 오답입니다! 정답: ${correctAnswer}`);
    }

    this.currentQuestionIndex++;
    setTimeout(() => this.askQuestion(), 500); // 다음 문제 출력
}

    // 최종 점수 계산
    getFinalScore() {
        return this.score;
    }

    // 퀴즈 종료 및 NFT 보상 배정
    endQuiz() {
        this.timer.stopTimer(); // 타이머 중지
        console.log(`🎉 퀴즈 종료! 최종 점수: ${this.getFinalScore()} 점`);
        
        const nftRank = this.nftReward.getReward(this.getFinalScore()); // NFT 등급 배정
        console.log(`🏆 NFT 보상 등급: ${nftRank}`);

        process.exit(); // 프로그램 종료
    }
}

// CSV 파일 경로
const csvPath = "./seQUIZsheet.csv";

// QuizManager 인스턴스 생성
const quiz = new QuizManager(csvPath);

// 터미널 실행 (키보드 입력 감지)
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding("utf8");

// OX 입력 감지
process.stdin.on("data", (key) => {
    key = key.trim().toUpperCase();
    if (key === "O" || key === "X") {
        quiz.submitAnswer(key);
    } else {
        console.log("⚠️ O 또는 X를 입력하세요.");
    }
});

// 퀴즈 시작
quiz.startQuiz();
