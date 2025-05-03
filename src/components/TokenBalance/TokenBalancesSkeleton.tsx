import { Skeleton } from "antd";

import { skeletonWrapperStyles, skeletonNodeStyles } from "./styles";

const { Node: SkeletonNode } = Skeleton;

export const TokenBalancesSkeleton = () => {
  return (
    <ul style={{ listStyle: "none" }}>
      {Array.from({ length: 2 }).map((_, index) => (
        <li key={index} style={skeletonWrapperStyles}>
          <SkeletonNode style={skeletonNodeStyles} active />
          <SkeletonNode style={skeletonNodeStyles} active />
        </li>
      ))}
    </ul>
  );
};
