import { FERound, PerParData } from './types'

const minSlope = 55
const maxSlope = 155
const avgSlope = 113
const easySlopeRange = avgSlope - minSlope
const hardSlopeRange = maxSlope - avgSlope

const pgaPutts = 1.5
const badPuttAvg = 3
const puttRange = badPuttAvg - pgaPutts

export function puttIndexPerRound(puttArr: FERound[]) {
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
const greenRange = pgaGir - badGir
const fairwayRange = pgaFir - badFir

export function regIndexPerRound(regArr: FERound[]) {
  const moddedGirArr = [] as number[]
  const moddedFirArr = [] as number[]

  regArr.map((round) => {
    // calculate gir
    const roundLength = round.gross.length
    const adjustedParPerHole = round.parPerHole.slice(0, roundLength)

    const gir =
      round.gir.filter((gir) => gir === true).length / round.gir.length

    // calculate fir
    const fairwayHoles = round.fir.filter((fir) => fir === true).length
    const parFoursFives = adjustedParPerHole.filter((hole) => hole >= 4).length
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

const pga5 = 4.41
const bad5Avg = 8
const pga4 = 3.89
const bad4Avg = 7
const pga3 = 2.93
const bad3Avg = 6

export function perParIndex(
  par3Data: PerParData,
  par4Data: PerParData,
  par5Data: PerParData
) {
  const moddedParThreeData = [
    ((par3Data.totalGreens / par3Data.totalHoles - badGir) / greenRange) * 100,
    0,
    ((par3Data.totalPutts / par3Data.totalHoles - pgaPutts) / puttRange) * 100,
    100 - ((3 + par3Data.toPar - pga3) / (bad3Avg - pga3)) * 100,
  ]

  const moddedParFourData = [
    ((par4Data.totalGreens / par4Data.totalHoles - badGir) / greenRange) * 100,
    ((par4Data.totalFairways / par4Data.totalHoles - badFir) / fairwayRange) *
      100,
    ((par4Data.totalPutts / par4Data.totalHoles - pgaPutts) / puttRange) * 100,
    100 - ((4 + par4Data.toPar - pga4) / (bad4Avg - pga4)) * 100,
  ]

  const moddedParFiveData = [
    ((par5Data.totalGreens / par5Data.totalHoles - badGir) / greenRange) * 100,
    ((par5Data.totalFairways / par5Data.totalHoles - badFir) / fairwayRange) *
      100,
    ((par5Data.totalPutts / par5Data.totalHoles - pgaPutts) / puttRange) * 100,
    100 - ((5 + par5Data.toPar - pga5) / (bad5Avg - pga5)) * 100,
  ]

  return { moddedParFiveData, moddedParFourData, moddedParThreeData }
}
