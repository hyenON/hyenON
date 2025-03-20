//  QuestionBank 동적메서드 : 
//  1️⃣ loadQuestions(filePath)  ➝ CSV 파일에서 문제를 불러오기
//  2️⃣ getRandomSubset(array, count) ➝ 배열에서 무작위 문제 섞기
//  3️⃣ getRandomQuestions()  ➝ 수도 문제 5개 + 일반 문제 15개 랜덤 선택
//  4️⃣ formatQuestion(questionObj, index)  ➝ 문제를 보기 좋은 형식으로 변환


const fs = require("fs");
const path = require("path");
const Papa = require("papaparse"); // CSV 파싱 라이브러리

class QuestionBank {
    constructor(filePath) {
        this.questions = [];
        this.loadQuestions(filePath);
    }

    // 파일에서 문제 읽어오기
    loadQuestions(filePath) {
        const questionsPath = path.resolve(filePath);
        const fileContent = fs.readFileSync(questionsPath, "utf-8");
        const parsedData = Papa.parse(fileContent, { header: true }).data;
        this.questions = parsedData.filter(q => q.문제); // 문제 있는 행만 필터링
    }

    // 특정 개수만큼 랜덤 문제 가져오는 함수
    getRandomSubset(array, count) {
        return array.sort(() => Math.random() - 0.5).slice(0, count);
    }

    // 랜덤 문제 가져오기 (수도 문제 5개 포함)
    getRandomQuestions() {
        const capitalQuestions = this.questions.filter(q => {
            const questionNum = parseInt(q["NO."], 10);
            return questionNum >= 201 && questionNum <= 250;
        });

        const generalQuestions = this.questions.filter(q => {
            const questionNum = parseInt(q["NO."], 10);
            return questionNum < 201;
        });

        const selectedCapitalQuestions = this.getRandomSubset(capitalQuestions, 5);
        const selectedGeneralQuestions = this.getRandomSubset(generalQuestions, 15);

        return [...selectedCapitalQuestions, ...selectedGeneralQuestions];
    }
}

module.exports = QuestionBank;
