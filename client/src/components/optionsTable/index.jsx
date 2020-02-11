import React from 'react'

export function OptionsTable({ optionsData }) {
  console.log('DATA REACHES TABLE')
  console.log(optionsData)

  return (
    <React.Fragment>
      <table className='table'>
        <thead className='thead-dark'>
          <tr>
            <th scope='col'>Call/Put</th>
            <th scope='col'>Exp. Date</th>
            <th scope='col'>Strike</th>
            <th scope='col'>Ask</th>
            <th scope='col'>Today's Chg.</th>
            <th scope='col'>Volume</th>
            <th scope='col'>Open Int.</th>
            <th scope='col'>Vol/OI %</th>
          </tr>
        </thead>
        <tbody>
          {optionsData.map((options, index) => {
            return (
              <tr>
                <td>{optionsData[index][1]}</td>
                <td>{optionsData[index][0]}</td>
                <td>{optionsData[index][2]}</td>
                <td>{optionsData[index][3]}</td>
                <td>{optionsData[index][4]}</td>
                <td>{optionsData[index][5]}</td>
                <td>{optionsData[index][6]}</td>
                <td>{optionsData[index][7]}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </React.Fragment>
  )
}
