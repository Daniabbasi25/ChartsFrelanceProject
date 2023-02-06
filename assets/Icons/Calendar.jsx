import * as React from "react"
import Svg, { Path } from "react-native-svg"

const Calendar = (props) => (
  <Svg
    width={56}
    height={56}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M7.83 22.18h40.535M38.19 31.06h.02M28.098 31.06h.021M17.985 31.06h.021M38.19 39.9h.02M28.098 39.9h.021M17.985 39.9h.021M37.283 5.34v7.484M18.912 5.34v7.484"
      stroke="#203356"
      strokeWidth={1.125}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      clipRule="evenodd"
      d="M37.726 8.93H18.47c-6.679 0-10.85 3.72-10.85 10.559v20.58c0 6.946 4.171 10.752 10.85 10.752h19.235c6.7 0 10.85-3.741 10.85-10.58V19.489c.02-6.839-4.13-10.56-10.83-10.56Z"
      stroke="#203356"
      strokeWidth={1.125}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default Calendar
