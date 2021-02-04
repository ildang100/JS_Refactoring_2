let plays =
{
  "hamlet": {
    "name": "Hamlet",
    "type": "tragedy"
  },
  "as-like": {
    "name": "As You Like It",
    "type": "comedy"
  },
  "othello": {
    "name": "Othello",
    "type": "tragedy"
  }
}

let invoice =
  [
    {
      "customer": "BigCo",
      "performances": [
        {
          "playID": "hamlet",
          "audience": 55
        },
        {
          "playID": "as-like",
          "audience": 35
        },
        {
          "playID": "othello",
          "audience": 40
        }
      ]
    }
  ]

// 최상위
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice[0].customer})\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", minimumFractionDigits: 2
  }).format;

  for (let perf of invoice[0].performances) {
    // const play = playFor(perf)  // 우편을 함수로 추출  
    let thisAmount = amountFor(perf)  // 추출한 함수 이용 


    // increase point
    volumeCredits += Math.max(perf.audience - 30, 0)
    // if there are 5 audience in times, service add point
    if ("comedy" === playFor(perf).type) { // play 를 playFor() 호출로 변경
      volumeCredits += Math.floor(perf.audience / 5);
    }
    // print bills
    result += `  ${playFor(perf).name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`; // play 를 playFor() 호출로 변경
    totalAmount += thisAmount
  }

  result += `totalAmount : ${format(totalAmount / 100)}\n`
  result += `Point : ${volumeCredits}\n`
  return result;

}

console.log(statement(invoice, plays))

// statement() 함수..
function playFor(aPerformance) {
  return plays[aPerformance.playID]
}

// statement() 함수..
function amountFor(aPerformance) {
  let result = 0;

  switch (playFor(aPerformance).type) {
    case "tragedy":
      thisAmount = 40000;
      if (aPerformance.audience > 30) {
        thisAmount += 10000 * (aPerformance.audience - 30);
      }
      break;
    case "comedy": // 
      thisAmount = 30000;
      if (aPerformance.audience > 20) {
        thisAmount += 10000 + 500 * (aPerformance.audience - 20)
      }
      thisAmount += 300 * aPerformance.audience
      break
    default:
      throw new Error(`Unknown type : ${layFor(aPerformance).type}`)
  }
  return thisAmount;
}