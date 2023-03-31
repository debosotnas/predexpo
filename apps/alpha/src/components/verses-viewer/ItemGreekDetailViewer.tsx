interface GreekDetailProps {
  handleClose: () => void;
  greekWordInfo: any;
}

function ItemGreekDetailViewer({
  handleClose,
  greekWordInfo,
}: GreekDetailProps) {
  return (
    <div>
      <div>
        <button onClick={handleClose}>Close</button>
      </div>
      <div>{greekWordInfo.greek}</div>
      <div>{greekWordInfo.greekTrans}</div>
      <div>{greekWordInfo.literal}</div>
      <div>{greekWordInfo.morpho}</div>
      <div>{greekWordInfo.strong}</div>
      <div>
        Strong sources:
        <div>
          https://www.logosklogos.com/strongcodes/
          {greekWordInfo.strong}
        </div>{' '}
        <div>
          https://bibliaparalela.com/greek/
          {greekWordInfo.strong}.htm
        </div>{' '}
        <div>
          https://www.blueletterbible.org/lexicon/
          {greekWordInfo.strong}/kjv/tr/0-1/
        </div>{' '}
        <div>
          https://www.studylight.org/lexicons/eng/greek/
          {greekWordInfo.strong}.html
        </div>
      </div>
    </div>
  );
}

export default ItemGreekDetailViewer;
