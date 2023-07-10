import { FERound } from './types'

interface RoundArr {
  putts: number[]
  gir: boolean[]
  fir: boolean[]
  gross: number[]
  slope: number
  distance: number
  parPerHole: number[]
}

const minSlope = 55
const maxSlope = 155
const avgSlope = 113
const easySlopeRange = avgSlope - minSlope
const hardSlopeRange = maxSlope - avgSlope

const pgaPutts = 1.5
const badPuttAvg = 3

export function puttIndexPerRound(puttArr: FERound[]) {
  const puttRange = badPuttAvg - pgaPutts
  const moddedPuttArr = [] as number[]

  puttArr.map((round) => {
    const totalPutts = round.putts.reduce((total, putts) => total + putts)
    const avgPutts = totalPutts / round.putts.length

    // Calculate slope modifier
    let slopeModifier = 0
    if (round.slope < avgSlope) {
      const slopeDifference = avgSlope - round.slope
      slopeModifier = 1 + slopeDifference / easySlopeRange
    } else if (round.slope > avgSlope) {
      const slopeDifference = round.slope - avgSlope
      slopeModifier = 1 - slopeDifference / hardSlopeRange
    } else {
      slopeModifier = 1
    }

    // Calculate which 'percentile' using modified putts
    const modPuttPercentile =
      ((slopeModifier * avgPutts - pgaPutts) / puttRange) * 100

    moddedPuttArr.push(100 - modPuttPercentile)
  })

  return moddedPuttArr
}

const pgaGir = 0.75
const pgaFir = 0.715
const badGir = 0.17
const badFir = 0.2

export function regIndexPerRound(regArr: RoundArr[]) {
  const greenRange = pgaGir - badGir
  const fairwayRange = pgaFir - badFir

  const moddedGirArr = [] as number[]
  const moddedFirArr = [] as number[]

  regArr.map((round) => {
    // calculate gir
    const gir =
      round.gir.filter((gir) => gir === true).length / round.gir.length
    // console.log('\nRaw GIR', { gir })

    // calculate fir
    const fairwayHoles = round.fir.filter((fir) => fir === true).length
    const parFoursFives = round.parPerHole.filter((hole) => hole >= 4).length
    const fir = fairwayHoles / parFoursFives

    // calculate slope modifier
    let slopeModifier = 0
    if (round.slope < avgSlope) {
      const slopeDifference = avgSlope - round.slope
      slopeModifier = 1 - slopeDifference / easySlopeRange
    } else if (round.slope > avgSlope) {
      const slopeDifference = round.slope - avgSlope
      slopeModifier = 1 + slopeDifference / hardSlopeRange
    } else {
      slopeModifier = 1
    }

    // Calculate adjustments

    const moddedGir = gir * slopeModifier
    const girPercentile = ((moddedGir - badGir) / greenRange) * 100

    const moddedFir = fir * slopeModifier
    const firPercentile = ((moddedFir - badFir) / fairwayRange) * 100

    moddedGirArr.push(girPercentile)
    moddedFirArr.push(firPercentile)
  })
  return { moddedFirArr, moddedGirArr }
}
