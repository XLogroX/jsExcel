import $ from '../../core/dom';

const resizeHandler = (evt, $root) => {
  return new Promise((resolve) => {
    const startCoords = {
      clientX: evt.clientX,
      clientY: evt.clientY,
    };

    const $resizer = $(evt.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const currentCells = $root.findAll(`[data-col="${$parent.data.col}"]`);
    const type = evt.target.dataset.resize;
    const resizeProperty =
      type === 'col' ?
        {
          size: 'width',
          coordinate: 'clientX',
          parentPosition: 'right',
          resizerPosition: 'bottom',
        } :
        {
          size: 'height',
          coordinate: 'clientY',
          parentPosition: 'bottom',
          resizerPosition: 'right',
        };

    const parentCoords = $parent.getCoords();

    let value;
    let delta;

    $resizer.css({
      opacity: 1,
      [resizeProperty.resizerPosition]: '-5000px',
    });

    const onMousemove = function(mevt) {
      delta =
        mevt[resizeProperty.coordinate] -
        parentCoords[resizeProperty.parentPosition] +
        (parentCoords[resizeProperty.parentPosition] -
          startCoords[resizeProperty.coordinate]);

      $resizer.css({
        [resizeProperty.parentPosition]: -delta + 'px',
      });
    };

    const onMouseup = function() {
      $resizer.css({
        opacity: null,
        bottom: 0,
        right: 0,
      });

      if (delta) {
        value = parentCoords[resizeProperty.size] + delta;

        $parent.css({
          [resizeProperty.size]: value + 'px',
        });

        if (type === 'col') {
          currentCells.forEach((cell) => {
            cell.style.width = value + 'px';
          });
        }

        resolve({
          value,
          type,
          id: $parent.data[type],
        });
      }

      document.removeEventListener('mousemove', onMousemove);
      document.removeEventListener('mouseup', onMouseup);
    };

    document.addEventListener('mousemove', onMousemove);
    document.addEventListener('mouseup', onMouseup);
  });
};

export {resizeHandler};
