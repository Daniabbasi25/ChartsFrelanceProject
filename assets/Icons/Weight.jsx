import * as React from "react"
import Svg, { Path } from "react-native-svg"

const Weight = (props) => (
  <Svg
    width={32}
    height={32}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M.888 29.249V3.323a.807.807 0 0 0 .044-.137A2.831 2.831 0 0 1 3.791.778c8.398 0 16.797.005 25.195.014a3.18 3.18 0 0 1 1.31.294 2.744 2.744 0 0 1 1.603 2.692v25.108a2.837 2.837 0 0 1-1.036 2.26 3.234 3.234 0 0 1-1.506.649H3.433a.94.94 0 0 0-.142-.045c-.692-.1-1.32-.46-1.757-1.005a3.204 3.204 0 0 1-.646-1.496Zm14.14-16.97c.076-.01.135-.014.193-.025a6.067 6.067 0 0 1 2.075-.056 5.593 5.593 0 0 1 3.012 1.436.732.732 0 0 0 1.186-.04l3.765-3.767a.743.743 0 0 0-.024-1.225 12.26 12.26 0 0 0-7.163-3.469 12.448 12.448 0 0 0-10.533 3.49.735.735 0 0 0 0 1.202c.575.582 1.155 1.157 1.733 1.735l2.055 2.055c.325.322.64.395.946.183.476-.332.935-.69 1.418-1.049-.032-.074-.068-.166-.11-.25l-1.247-2.753a2.01 2.01 0 0 1-.125-.368.686.686 0 0 1 .819-.809c.154.035.29.121.388.245.082.115.15.239.206.368l1.406 3.097Z"
      fill="#14B8A6"
    />
  </Svg>
)

export default Weight