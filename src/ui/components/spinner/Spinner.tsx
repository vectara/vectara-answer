import classNames from "classnames";
import { SPINNER_SIZE } from "./types";

const sizeToClassNameMap = {
  xs: "vuiSpinner--xs",
  s: "vuiSpinner--s",
  m: "vuiSpinner--m",
  l: "vuiSpinner--l",
  xl: "vuiSpinner--xl",
  xxl: "vuiSpinner--xxl",
  xxxl: "vuiSpinner--xxxl"
} as const;

type Props = {
  size?: (typeof SPINNER_SIZE)[number];
};

export const VuiSpinner = ({ size = "m" }: Props) => {
  const classes = classNames("vuiSpinner", sizeToClassNameMap[size]);
  return (
    <div className={classes}>
      <svg
        className="vuiSpinner__animation"
        version="1.0"
        width="100px"
        height="100px"
        viewBox="0 0 128 128"
        xmlSpace="preserve"
      >
        <g>
          <path fill="#d7c3fc" d="M99.359,10.919a60.763,60.763,0,1,0,0,106.162A63.751,63.751,0,1,1,99.359,10.919Z" />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 64 64"
            to="360 64 64"
            dur="960ms"
            repeatCount="indefinite"
          />
        </g>
        <g>
          <path fill="#ab81fa" d="M28.641,117.081a60.763,60.763,0,1,0,0-106.162A63.751,63.751,0,1,1,28.641,117.081Z" />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 64 64"
            to="360 64 64"
            dur="1440ms"
            repeatCount="indefinite"
          />
        </g>
        <g>
          <path fill="#7027f6" d="M117.081,99.313a60.763,60.763,0,1,0-106.162,0A63.751,63.751,0,1,1,117.081,99.313Z" />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 64 64"
            to="360 64 64"
            dur="2880ms"
            repeatCount="indefinite"
          />
        </g>
      </svg>
    </div>
  );
};
