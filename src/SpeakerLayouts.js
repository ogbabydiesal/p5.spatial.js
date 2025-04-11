function quad() {
    return {
        out_1 : {
          x: 0,
          y: 0,
          w: 10,
          h: 10
        },
        out_2 : {
          x: width - 10,
          y: 0,
          w: 10,
          h: 10
        },
        out_3 : {
          x: width - 10,
          y: height - 10,
          w: 10,
          h: 10
        },
        out_4 : {
          x: 0,
          y: height - 10,
          w: 10,
          h: 10
        }
      }
    
}

export default quad;