export function quad() {
  return {
    out_1 : {
      x: 0,
      y: 0,
      w: 10,
      h: 10
    },
    out_2 : {
      x: width,
      y: 0,
      w: 10,
      h: 10
    },
    out_3 : {
      x: width,
      y: height,
      w: 10,
      h: 10
    },
    out_4 : {
      x: 0,
      y: height,
      w: 10,
      h: 10
    }
  } 
}

export function octophonic() {
  // Calculate center point
  const centerX = width / 2;
  const centerY = height / 2;
  // Calculate radius (slightly smaller than half the minimum dimension)
  const radius = width / 2;
  
  // Create 8 evenly spaced points in a circle
  return {
    out_1: {  // top
      x: centerX,
      y: centerY - radius,
      w: 10,
      h: 10
    },
    out_2: {  // top-right
      x: centerX + radius * 0.7071,  // cos(45°) ≈ 0.7071
      y: centerY - radius * 0.7071,      // sin(45°) ≈ 0.7071
      w: 10,
      h: 10
    },
    out_3: {  // right
      x: centerX + radius,
      y: centerY,
      w: 10,
      h: 10
    },
    out_4: {  // bottom-right
      x: centerX + radius * 0.7071,
      y: centerY + radius * 0.7071,
      w: 10,
      h: 10
    },
    out_5: {  // bottom
      x: centerX,
      y: centerY + radius,
      w: 10,
      h: 10
    },
    out_6: {  // bottom-left
      x: centerX - radius * 0.7071,
      y: centerY + radius * 0.7071,
      w: 10,
      h: 10
    },
    out_7: {  // left
      x: centerX - radius,
      y: centerY,
      w: 10,
      h: 10
    },
    out_8: {  // top-left
      x: centerX - radius * 0.7071,
      y: centerY - radius * 0.7071,
      w: 10,
      h: 10
    }
  }
}

export function fivePointOne() {
  return {
    //SMPTE 5.1 speaker layout
    out_1: {  //front left
      x: 0,
      y: height / 2,
      w: 10,
      h: 10
    },
    out_2: {  //front right
      x: width,
      y: height / 2,
      w: 10,
      h: 10
    },
    out_3: {  //center
      x: width / 2,
      y: height / 2,
      w: 10,
      h: 10
    },
    out_4: {  //subwoofer (place far away/don't render subwoofer channel)
      x: -100000,
      y: -100000,
      w: 0,
      h: 0
    },
    out_5: {  //rear left
      x: 0,
      y: height,
      w: 10,
      h: 10
    },
    out_6: {  //rear right
      x: width,
      y: height,
      w: 10,
      h: 10
    }
  }
}