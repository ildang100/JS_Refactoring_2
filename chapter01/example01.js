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
    const play = plays[perf.playID];
    let thisAmount = amountFor(perf, play)  // 추출한 함수 이용


    // increase point
    volumeCredits += Math.max(perf.audience - 30, 0)
    // if there are 5 audience in times, service add point
    if ("comedy" === play.type) {
      volumeCredits += Math.floor(perf.audience / 5);
    }
    // print bills
    result += `  ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
    totalAmount += thisAmount
  }

  result += `totalAmount : ${format(totalAmount / 100)}\n`
  result += `Point : ${volumeCredits}\n`
  return result;

}

console.log(statement(invoice, plays))

// statement() 함수..
function amountFor(aPerformance, play) {
  let result = 0;

  switch (play.type) {
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
      throw new Error(`Unknown type : ${aPerformance.type}`)
  }
  return thisAmount;
}