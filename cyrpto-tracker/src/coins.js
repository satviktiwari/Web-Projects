import React from 'react'

const coins = ({ name, symbol, price, volume }) => {
  return (
    // <div>
    //     <div>
    //         <h1>{name}</h1>
    //         <p>{symbol}</p>
    //     </div>
    //     <div>
    //         <p>${price}</p>
    //         <p>${volume}</p>
    //     </div>
    // </div>
    <div>
      <table>
        <tr>
          <td>{name}, </td>
          <td>{symbol}, </td>
          <td>{price}, </td>
          <td>{volume}, </td>
        </tr>
      </table>
    </div>
  )
}

export default coins