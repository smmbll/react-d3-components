const qDiff = (sigma_in,sigma_tot,k_i,k_iin,m) => {
  return (((sigma_in + k_iin) / (2 * m)) - Math.pow((sigma_tot + k_i) / (2 * m),2)) - ((sigma_in / (2 * m)) - Math.pow(sigma_tot / (2 * m),2) - Math.pow(k_i / (2 * m),2));
};

export default qDiff;
