
//class create
class UserWallet {
  // Metamask 연결 및 지갑 주소 가져오기
  async connectWallet() {
      if (!window.ethereum) {
          throw new Error("Metamask가 설치되지 않았습니다.");
      }

      try {
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          return accounts[0]; // 첫 번째 계정(사용자 지갑 주소) 반환
      } catch (error) {
          throw new Error("지갑 연결이 취소되었습니다.");
      }
  }

  // 현재 연결된 지갑 주소 가져오기
  async getWalletAddress() {
      if (!window.ethereum) {
          throw new Error("Metamask가 설치되지 않았습니다.");
      }

      try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          return accounts.length > 0 ? accounts[0] : null; // 연결된 계정이 있으면 반환, 없으면 null
      } catch (error) {
          throw new Error("지갑 주소를 가져오는 중 오류 발생.");
      }
  }
}

// 사용 예시 (테스트용)
(async () => {
  const wallet = new UserWallet();

  try {
      const address = await wallet.connectWallet();
      console.log("지갑 연결 완료! 주소:", address);
  } catch (error) {
      console.error(error.message);
  }
})();
