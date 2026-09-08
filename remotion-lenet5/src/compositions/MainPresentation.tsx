import React from "react";
import { Sequence } from "remotion";
import { ConvolutionComp } from "./ConvolutionComp";
import { NeuronComp } from "./NeuronComp";
import { PoolingComp } from "./PoolingComp";
import { PipelineComp } from "./PipelineComp";

export const MainPresentation: React.FC = () => {
  return (
    <div style={{ flex: 1, backgroundColor: "#0f172a" }}>
      {/* 0-6s : Convolution */}
      <Sequence from={0} durationInFrames={180}>
        <ConvolutionComp />
      </Sequence>

      {/* 6-12s : Neurone */}
      <Sequence from={180} durationInFrames={180}>
        <NeuronComp />
      </Sequence>

      {/* 12-18s : Pooling */}
      <Sequence from={360} durationInFrames={180}>
        <PoolingComp />
      </Sequence>

      {/* 18-26s : Pipeline LeNet-5 */}
      <Sequence from={540} durationInFrames={240}>
        <PipelineComp />
      </Sequence>
    </div>
  );
};
