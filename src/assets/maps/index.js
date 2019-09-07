import stage1 from "./stage1";
import stage2 from './stage2';

function getStage (stageNum) {
  switch (stageNum) {
    case 1:
      return stage1;
    case 2:
      return stage2;
    default:
      // ...
  }
}

export default getStage;
