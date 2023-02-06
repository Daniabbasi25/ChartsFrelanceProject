import * as React from "react"
import Svg, { Path } from "react-native-svg"

const HeartBeat = (props) => (
  <Svg
    width={20}
    height={38}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M8.75 37.5c-.48-.09-.968-.159-1.442-.277a9.182 9.182 0 0 1-5.215-3.478A9.129 9.129 0 0 1 .338 27.74a9.058 9.058 0 0 1 2.406-5.632.92.92 0 0 0 .21-.567c.013-4.713 0-9.427.013-14.141A6.524 6.524 0 0 1 4.15 3.536a6.6 6.6 0 0 1 9.081-1.669 6.54 6.54 0 0 1 2.883 5.127c.012.228.013.455.013.683v13.782c-.008.271.091.535.276.734a8.821 8.821 0 0 1 1.82 9.17 8.856 8.856 0 0 1-2.701 4.002 8.9 8.9 0 0 1-4.407 1.999c-.257.05-.516.092-.774.138L8.75 37.5ZM5.588 14.777c0 2.465-.014 4.928.01 7.392a1.835 1.835 0 0 1-.623 1.452 6.487 6.487 0 0 0-1.584 7.028 6.516 6.516 0 0 0 2.31 2.999 6.55 6.55 0 0 0 3.594 1.214 6.606 6.606 0 0 0 3.794-1.026 6.573 6.573 0 0 0 2.533-2.995 6.49 6.49 0 0 0-1.554-7.281 1.69 1.69 0 0 1-.572-1.327c.012-4.281.006-8.564.006-12.846 0-.746.019-1.484-.01-2.225a3.922 3.922 0 0 0-1.54-2.976 3.952 3.952 0 0 0-3.282-.716c-.886.201-1.676.7-2.236 1.413a3.933 3.933 0 0 0-.84 2.502c-.014 2.464-.006 4.929-.006 7.392Z"
      fill="#14B8A6"
    />
    <Path
      d="M10.36 37.81H8.69l-.455-.082c-.329-.057-.67-.117-.998-.199a9.514 9.514 0 0 1-5.387-3.6 9.457 9.457 0 0 1-1.82-6.205 9.396 9.396 0 0 1 2.486-5.82.61.61 0 0 0 .13-.359c.007-2.544.007-5.13.008-7.632v-6.51a6.835 6.835 0 0 1 1.243-4.041A6.873 6.873 0 0 1 7.283.816a6.9 6.9 0 0 1 7.023 1.52 6.856 6.856 0 0 1 2.121 4.649c.013.248.014.487.014.697V21.466a.72.72 0 0 0 .2.53 9.98 9.98 0 0 1 2.296 4.483 9.258 9.258 0 0 1-.417 4.992 9.322 9.322 0 0 1-2.784 4.128 10.02 10.02 0 0 1-4.562 2.076c-.182.036-.365.067-.543.097l-.238.04-.033-.002Zm-1.583-.621h1.528l.213-.037c.175-.03.355-.061.53-.095a8.586 8.586 0 0 0 4.264-1.927 8.541 8.541 0 0 0 2.613-3.872 8.505 8.505 0 0 0-1.763-8.865 1.348 1.348 0 0 1-.35-.936V7.675c0-.202 0-.437-.013-.666a6.237 6.237 0 0 0-1.926-4.232 6.277 6.277 0 0 0-6.391-1.386 6.257 6.257 0 0 0-3.081 2.32 6.223 6.223 0 0 0-1.128 3.683v6.508c0 2.502 0 5.09-.008 7.635a1.218 1.218 0 0 1-.29.773 8.788 8.788 0 0 0-2.327 5.444 8.837 8.837 0 0 0 1.7 5.798 8.89 8.89 0 0 0 5.034 3.365c.313.078.642.135.96.19.145.033.29.055.434.082h.001Zm.749-2.014h-.25a6.873 6.873 0 0 1-3.76-1.269 6.869 6.869 0 0 1-2.423-3.142 6.782 6.782 0 0 1-.285-3.93A6.747 6.747 0 0 1 4.755 23.4a1.535 1.535 0 0 0 .528-1.224c-.016-1.8-.014-3.63-.011-5.4V7.394a4.236 4.236 0 0 1 .908-2.696 4.261 4.261 0 0 1 2.41-1.52 4.238 4.238 0 0 1 3.882 1.06 4.219 4.219 0 0 1 1.324 2.922c.021.532.017 1.071.012 1.593V12.387c0 3.232 0 6.572-.007 9.858a1.379 1.379 0 0 0 .475 1.1 6.812 6.812 0 0 1 2.017 3.565 6.784 6.784 0 0 1-.39 4.062 6.875 6.875 0 0 1-2.548 3.062 6.91 6.91 0 0 1-3.824 1.141h-.005ZM9.55 3.68a3.671 3.671 0 0 0-2.88 1.398 3.626 3.626 0 0 0-.773 2.308c-.008 1.715 0 3.46 0 5.147V16.765c0 1.768 0 3.596.01 5.393a2.15 2.15 0 0 1-.722 1.68 6.132 6.132 0 0 0-1.767 3.12 6.167 6.167 0 0 0 .26 3.574A6.249 6.249 0 0 0 5.88 33.39a6.25 6.25 0 0 0 3.42 1.154h.23a6.285 6.285 0 0 0 3.482-1.042 6.254 6.254 0 0 0 2.318-2.793 6.171 6.171 0 0 0 .353-3.692 6.193 6.193 0 0 0-1.833-3.24 2 2 0 0 1-.671-1.554c.008-3.285.008-6.626.007-9.856V8.729c0-.515.008-1.047-.012-1.565a3.609 3.609 0 0 0-1.105-2.471 3.631 3.631 0 0 0-2.516-1.014H9.55Z"
      fill="#14B8A6"
    />
    <Path
      d="M10.847 20.387v3.911a.392.392 0 0 0 .278.424c.833.36 1.516.997 1.931 1.802.416.804.54 1.728.35 2.613a3.943 3.943 0 0 1-1.344 2.213 3.966 3.966 0 0 1-2.43.908 3.959 3.959 0 0 1-2.526-.838 3.936 3.936 0 0 1-1.419-2.246 3.895 3.895 0 0 1 .313-2.6 3.914 3.914 0 0 1 1.89-1.818.506.506 0 0 0 .345-.56c-.01-2.548-.01-5.096 0-7.644a1.298 1.298 0 0 1 .517-1.109 1.308 1.308 0 0 1 1.212-.192 1.298 1.298 0 0 1 .888 1.296c.003 1.28-.005 2.56-.005 3.84Z"
      fill="#14B8A6"
    />
    <Path
      d="M9.528 14.868c.182.001.363.03.535.089a1.603 1.603 0 0 1 1.101 1.59V24.295c-.002.03.001.06.01.088a.25.25 0 0 0 .085.05 4.224 4.224 0 0 1 2.085 1.943c.448.869.58 1.866.372 2.82a4.263 4.263 0 0 1-1.452 2.387 4.288 4.288 0 0 1-2.621.98h-.056a4.258 4.258 0 0 1-3.862-6.133 4.216 4.216 0 0 1 2.042-1.962c.151-.068.164-.089.162-.276-.008-2.438-.01-5.01 0-7.646a1.624 1.624 0 0 1 .973-1.54 1.64 1.64 0 0 1 .626-.139Zm.055 17.08h.049a3.659 3.659 0 0 0 2.235-.839 3.637 3.637 0 0 0 1.236-2.037 3.594 3.594 0 0 0-.32-2.407A3.612 3.612 0 0 0 11 25.007a.698.698 0 0 1-.463-.711c.009-1.01.008-2.038 0-3.033v-4.708a.991.991 0 0 0-.674-1.003 1.061 1.061 0 0 0-.338-.056 1.01 1.01 0 0 0-.926.667 1 1 0 0 0-.056.397c-.007 2.634 0 5.204 0 7.64a.806.806 0 0 1-.53.845 3.59 3.59 0 0 0-1.741 1.673 3.574 3.574 0 0 0-.285 2.393 3.61 3.61 0 0 0 1.29 2.057c.655.517 1.47.792 2.305.78Z"
      fill="#14B8A6"
    />
  </Svg>
)

export default HeartBeat
