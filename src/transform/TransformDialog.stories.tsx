import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import TransformDialog from "./TransformDialog";
import { IRppData } from "../project/reaperProject";
import rppToElement from "../project/rppToElement";
import { readTestResource } from "../test/utilBrowser";
import AsyncLoader from "../test/AsyncLoader";

const loadTestRpps = async () => {
  const names = ["EmptyProject.rpp", "OneEmptyTrack.rpp", "OneTrackWithMidiData.rpp", "OneTrackWithOneVst.rpp"];
  const rppPromises = names.map(async name => {
    return {
      name: name,
      rootElement: await rppToElement(readTestResource(name)),
    } as IRppData;
  });

  return await Promise.all(rppPromises);
};

storiesOf("TransformDialog", module).add("with 1 transformed project", () => {
  return (
    <AsyncLoader loadData={loadTestRpps}>
      {data => <TransformDialog show={true} transformedRpps={data} onClose={action("on-close")} />}
    </AsyncLoader>
  );
});
