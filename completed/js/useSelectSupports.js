const supports = [
    {
      type: "support",
      src:'../images/support.svg'
    },
    {
      type: "hinge",
      src:'../images/hinge.svg'
    },
    {
      type: "fixed",
      src:'../images/fixedSupport.svg'
    },
    {
      type: "Zl",
      src:'../images/sealingLeft.svg'
    },
    {
      type: "ZR",
      src:'../images/sealingRight.svg'
    }
   ];

   function createButton(item){
      const button = document.createElement('button');
      button.classList.add('support-select-button');
      button.dataset.type = item.type;
      button.innerHTML = `<img src="${item.src}" alt="${item.type}" width='30' height='30'>`;
      return button;
   }
   function getCoords(e){
      if(e instanceof MouseEvent){
          const rect = e.target.getBoundingClientRect();
          coordX = e.clientX - rect.left,
          coordY = e.clientY - rect.top;
          console.log("x: " + coordX + " y: " + coordY);
          return {
              x: coordX,
              y: coordY
          }
      }
   }
   document.getElementById('beam').addEventListener('click', getCoords);