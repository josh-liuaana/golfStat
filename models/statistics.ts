import { FERound } from './types'

export function statCalculator(roundArray: FERound[]) {
  let puttCounter = 0
  let holeCounter = 0
  let fairwayCounter = 0
  let foursFivesCounter = 0
  let greensCounter = 0
  const toParArr = [] as number[]
  roundArray.map((round) => {
    const roundPutts = round.putts.reduce((total, putts) => total + putts)
    puttCounter = puttCounter + roundPutts
    const roundHoles = round.putts.length
    holeCounter = holeCounter + roundHoles
    const fairwayHoles = round.fir.filter((fir) => fir === true).length
    fairwayCounter = fairwayCounter + fairwayHoles
    const foursFives = round.parPerHole.filter((hole) => hole >= 4).length
    foursFivesCounter = foursFivesCounter + foursFives
    const greenHoles = round.gir.filter((gir) => gir === true).length
    greensCounter = greensCounter + greenHoles

    const totalGross = round.gross.reduce((total, score) => total + score)
    const adjustedParPerHole = round.parPerHole.slice(0, round.gross.length)
    const adjustedPar = adjustedParPerHole.reduce((total, par) => total + par)

    const toPar = totalGross - adjustedPar
    toParArr.push(toPar)
  })

  return {
    totalPutts: puttCounter,
    totalHoles: holeCounter,
    totalFairways: fairwayCounter,
    totalParFourFive: foursFivesCounter,
    totalGreens: greensCounter,
    toPar: Number(
      toParArr.reduce((total, gross) => total + gross) / holeCounter
    ),
  }
}

/* --- INDIVIDUAL PAR DATA CALCULATIONS --- */
// ? avg gross, avg putts, green %, fairway %

export function perParStats(roundArray: FERound[], par: number) {
  const girArray = [] as boolean[]
  const grossArray = [] as number[]
  const firArray = [] as boolean[]
  const puttArray = [] as number[]

  roundArray.map((round) => {
    const adjustedParPerHole = round.parPerHole.slice(0, round.gross.length)
    adjustedParPerHole.map((hole, idx) => {
      if (hole === par) {
        girArray.push(round.gir[idx])
        grossArray.push(round.gross[idx])
        firArray.push(round.fir[idx])
        puttArray.push(round.putts[idx])
      }
    })
  })

  const roundHoles = puttArray.length
  const roundPutts = puttArray.reduce((total, putts) => total + putts)
  const fairwayHoles = firArray.filter((fir) => fir === true).length
  const greenHoles = girArray.filter((gir) => gir === true).length
  const totalGross = grossArray.reduce((total, score) => total + score)
  const totalPar = roundHoles * par
  const toPar = (totalGross - totalPar) / roundHoles

  return {
    totalHoles: roundHoles,
    totalPutts: roundPutts,
    totalFairways: fairwayHoles,
    totalGreens: greenHoles,
    toPar: Number(toPar.toFixed(2)),
  }
}
