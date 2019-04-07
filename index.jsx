// Update every second for the clock. Expensive elements should
// throttle themselves
export const refreshFrequency = 5000 // ms

const USE_BASE_TEN = 10

const theme = {
  borderSize: 10,
  thickness: '2px',
  green: '#97c475',
  green_threshold: 80,
  yellow: '#e5c07b',
  yellow_threshold: 55,
  orange: '#d09a6a',
  orange_threshold: 30,
  red: '#e06c75',
  screenSize: window.innerWidth
}

const computeUsedBattery = usedPercentage => {
  const paddingPercent = (100 - usedPercentage)/2
  return theme.screenSize * (paddingPercent / 100)
}
const computeBatteryColor = level => {
  const {
    green,
    green_threshold,
    yellow,
    yellow_threshold,
    orange,
    orange_threshold,
    red
  } = theme

  if (level > green_threshold)
    return green
  if (level > yellow_threshold)
    return yellow
  if (level > orange_threshold)
    return orange
  return theme.red
}

const getBarStyle = (batteryPercentage) => {
  const height = theme.thickness
  const background = computeBatteryColor(batteryPercentage)
  const borderSize = theme.borderSize + computeUsedBattery(batteryPercentage)

  return {
    top: 25,
    right: borderSize,
    left: borderSize,
    position: 'fixed',
    background,
    overflow: 'hidden',
    height,
  }
}

export const command = `pmset -g batt | egrep '(\\d+)\%' -o | cut -f1 -d%`

export const render = ({ output, error }) => {
  const batteryPercentage = parseInt(output, USE_BASE_TEN)

  if(error) {
    console.log(new Date())
    console.log(error)
    console.log(String(error))
  }

  const barStyle = getBarStyle(batteryPercentage)

  return (
    <div style={barStyle}/>
  )
}