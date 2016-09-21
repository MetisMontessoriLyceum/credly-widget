class MaorInfo {
  constructor () {
    this.container = document.querySelector('.badges')
    this.nodes = document.querySelectorAll('.badge');

    this.addEventListeners()
    console.log(FLIP);
  }

  addEventListeners () {
    console.log(this.nodes);
    this.nodes.forEach(node => node.addEventListener('click',
        _ => this.expand(node)));
  }

  expand (node) {
    console.log(node);
    let flip = new FLIP.group([{
        element: node,
        duration: 4000,
        easing: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t }
      },
      {
        element: node.querySelector('.img'),
        duration: 4000,
        function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t }
      }])

    flip.first()

    flip.last('maor-info')

    flip.invert()

    flip.play()

    // const beforePos = node.getClientRects()[0];
    // node.classList.add('maor-info');
    // node.style.top = `${this.container.scrollTop}px`
    // this.container.classList.add('has-maor-info');
    // const afterPos = node.getClientRects()[0];
    // console.log(beforePos, afterPos);
    //
    // const scaleWidth = beforePos.width/afterPos.width;
    // const scaleHeight = beforePos.height/afterPos.height;
    // const translateWidth = (beforePos.left-afterPos.left)+((beforePos.width-afterPos.width)-(beforePos.width-afterPos.width)*scaleWidth)/2;
    // const translateHeight = beforePos.top-afterPos.top;
    //
    // console.log(((beforePos.width-afterPos.width)-(beforePos.width-afterPos.width)*scaleWidth)/2);
    //
    // node.style.transform = `
    //     translate(${translateWidth}px,
    //               ${translateHeight}px)
    //     scale(${scaleWidth},1)`
  }
}

new MaorInfo();
