class Utils {   
  capitalize(str) {
    // return str.charAt(0).toUpperCase() + str.slice(1);
    return str.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + str.substring(1)).join(' ');
}
}

export default Utils;