import React from "react";

export function renderIcon(
  icon: React.ReactNode,
  color?: string,
  size?: number,
): React.ReactNode {
  if (!React.isValidElement(icon)) {
    return icon;
  }

  const element = icon as React.ReactElement<{
    color?: string;
    size?: number;
  }>;

  const propsToPass: { color?: string; size?: number } = {};

  if (color !== undefined && element.props.color === undefined) {
    propsToPass.color = color;
  }

  if (size !== undefined && element.props.size === undefined) {
    propsToPass.size = size;
  }

  if (Object.keys(propsToPass).length === 0) {
    return icon;
  }

  return React.cloneElement(element, propsToPass);
}
