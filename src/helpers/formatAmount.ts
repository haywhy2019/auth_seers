const  formatAmount = (value: any) => {
    let number = value
    if(typeof value == "string"){
        number = parseFloat(value)
    } 
    return new Intl.NumberFormat('en-US').format(number);
  }

  export default formatAmount