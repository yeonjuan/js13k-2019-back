import stage1 from "./stage1";
import stage2 from './stage2';
import stage3 from './stage3';
import stage4 from './stage4';
import stage5 from './stage5';

function getStage (stageNum) {
  switch (stageNum) {
    case 1:
      return stage1;
    case 2:
      return stage2;
    case 3:
      return stage3;
    case 4:
      return stage4;
    case 5:
      return stage5;
    default:
      // ...
  }
}

export default getStage;
