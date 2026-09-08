import React from "react";
import { Composition } from "remotion";
import { ConvolutionComp } from "./compositions/ConvolutionComp";
import { NeuronComp } from "./compositions/NeuronComp";
import { PoolingComp } from "./compositions/PoolingComp";
import { PipelineComp } from "./compositions/PipelineComp";
import { MainPresentation } from "./compositions/MainPresentation";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ConvolutionComp"
        component={ConvolutionComp}
        durationInFrames={240}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="NeuronComp"
        component={NeuronComp}
        durationInFrames={240}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="PoolingComp"
        component={PoolingComp}
        durationInFrames={240}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="PipelineComp"
        component={PipelineComp}
        durationInFrames={240}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="MainPresentation"
        component={MainPresentation}
        durationInFrames={780}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
