import ThemedText from '@/components/CustomComponents/ThemedText/ThemedText';
import ThemedView from '@/components/CustomComponents/ThemedView/ThemedView';

let arr = new Array(10).fill(null).map(() => new Array(10).fill(0));
// Declare row and column variables
let row = 0,
  col = 0;

let counter = 0;
let finalAns = 0;
let check = 0;

let solutionComponentsArray=[];

function changerow(row1, row2) {
  // printmatrix();
  const card = `\nExchanging R${row1} and R${row2}\n`;
  solutionComponentsArray.push(<TransformationVisualization transformation={card} />);
  // finalAns.insertAdjacentHTML(
  //   'beforeend',
  //   `<p>\nExchanging R${row1} and R${row2}\n</p>`,
  // );
  let helparr = new Array(10);
  for (let h1 = 1; h1 <= col; h1++) {
    helparr[h1] = arr[row1][h1];
    arr[row1][h1] = arr[row2][h1];
    arr[row2][h1] = helparr[h1];
  }
  printmatrix(arr);
}

function lastcheck2() {
  let roww1 = 0,
    roww2 = 0,
    x1,
    x2,
    x3,
    now1,
    now2;

  for (x1 = 1; x1 < row; x1++) {
    for (x3 = row; x3 >= x1 + 1; x3--) {
      roww1 = 0;
      roww2 = 0;

      for (x2 = 1; x2 <= col; x2++) {
        if (arr[x1][x2] !== 0) {
          now2 = arr[x1][x2];
          break;
        }
        roww1++;
      }

      for (x2 = 1; x2 <= col; x2++) {
        if (arr[x3][x2] !== 0) {
          now1 = arr[x3][x1];
          break;
        }
        roww2++;
      }

      if (roww1 > roww2) {
        changerow(x3, x1);
      }
      if (roww1 === roww2) {
        if (arr[x3][x2] === 0) {
          continue;
        } else {
          if (allZero(x1, x3)) {
          } else {
            rowtransform2(x3, x2, 1, x1);
          }
        }
      }

      roww1 = 0;
      roww2 = 0;
    }
  }
}

function allZero(roww1, roww2) {
  let isAllZero1 = 1;
  let isAllZero2 = 1;
  for (let j = 1; j <= col; j++) {
    if (arr[roww1][j] != 0) {
      isAllZero1 = 0;
      break;
    }
  }
  for (let j = 1; j <= col; j++) {
    if (arr[roww2][j] != 0) {
      isAllZero2 = 0;
      break;
    }
  }
  // console.log(
  //   "return of allZero: ",
  //   isAllZero1 && isAllZero2,
  //   "for rows : ",
  //   roww1,
  //   " and ",
  //   roww2
  // );
  return isAllZero1 && isAllZero2;
}

function rowtransform(roww1, columne1, check) {
  let no1, no2, le, roww2;
  roww2 = roww1 - 1;

  no1 = arr[columne1][columne1];
  no2 = arr[roww1][columne1];

  if (no2 === 0) {
    return 1;
  }

  if (no2 !== 0 && no1 === 0) {
    changerow(roww1, columne1);
    return 1;
  }

  dispTransfor(no1, roww1, no2, columne1);

  for (le = 1; le <= col; le++) {
    arr[roww1][le] = no1 * arr[roww1][le] - no2 * arr[columne1][le];
  }

  printmatrix();
  lastcheck2();
  check = 0;

  return 1;
}

function rowtransform2(roww1, columne1, check, rowww2) {
  let no1, no2, le;
  let roww2 = rowww2;
  check = parseInt(check);
  // if (columne1 == 4 && col == 3) {
  //   columne1 = 3;
  // }
  if (check == 1) {
    no1 = arr[roww2][columne1];
  } else {
    no1 = arr[columne1][columne1];
  }
  no2 = arr[roww1][columne1];
  // finalAns.insertAdjacentHTML(
  //   "beforeend",
  //   `<p>\nin rt2 n1 = ${no1}, n2 = ${no2}  ${columne1}  ${roww2}  ${roww1}  ${check}\n</p>`
  // );

  if (check === 1) {
    dispTransfor(no1, roww1, no2, roww2);
  } else {
    dispTransfor(no1, roww1, no2, columne1);
  }

  // finalAns.insertAdjacentHTML(
  //   "beforeend",
  //   `<span>(This Transformation may or may not be necessary.)\n</span>`
  // );

  for (le = 1; le <= col; le++) {
    if (check === 1) {
      arr[roww1][le] = no1 * arr[roww1][le] - no2 * arr[roww2][le];
    } else {
      arr[roww1][le] = no1 * arr[roww1][le] - no2 * arr[columne1][le];
    }
  }

  printmatrix();
  check = 0;
  return 1;
}

function elementfind(arr, row, col) {
  for (let k2 = 0; k2 < col; k2++) {
    for (let k1 = row - 1; k1 > k2; k1--) {
      rowtransform(k1, k2, 0);
    }
  }
}

function dispTransfor(n1, roww, n2, columne) {
  let card = '\n';

  if (n1 === 1 && n2 === 1) {
    card = `Next transformation : R${roww} = R${roww} - R${columne}`;
    // console.log(`R${roww} = R${roww} - R${columne}\n`);
  } else if (n1 === 1 && n2 === -1) {
    card = `Next transformation : R${roww} = R${roww} + R${columne}`;
    // console.log(`R${roww} = R${roww} + R${columne}\n`);
  } else if (n1 === -1 && n2 === 1) {
    card = `Next transformation : R${roww} = -R${roww} - R${columne}`;
    // console.log(`R${roww} = -R${roww} - R${columne}\n`);
  } else if (n1 === -1 && n2 === -1) {
    card = `Next transformation : R${roww} = R${roww} + R${columne}`;
    // console.log(`R${roww} = R${roww} + R${columne}\n`);
  } else if (n1 === 1) {
    card = `Next transformation : R${roww} = R${roww} - ${n2} x R${columne}`;
    // console.log(`R${roww} = R${roww} - ${n2} x R${columne}\n`);
  } else if (n2 === 1) {
    card = `Next transformation : R${roww} = ${n1} x R${roww} - R${columne}`;
    // console.log(`R${roww} = ${n1} x R${roww} - R${columne}\n`);
  } else if (n1 === -1) {
    card = `Next transformation : R${roww} = -R${roww} - ${n2} x R${columne}`;
    // console.log(`R${roww} = -R${roww} - ${n2} x R${columne}\n`);
  } else if (n2 === -1) {
    card = `Next transformation : R${roww} = ${n1} x R${roww} + R${columne}`;
    // console.log(`R${roww} = ${n1} x R${roww} + R${columne}\n`);
  } else if (n2 < 0) {
    card = `Next transformation : R${roww} = ${n1} x R${roww} + ${-n2} x R${columne}`;
    // console.log(`\nR${roww} = ${n1} x R${roww} + ${-n2} x R${columne}\n`);
  } else {
    card = `Next transformation : R${roww} = ${n1} x R${roww} - ${n2} x R${columne}`;
    // console.log(`\nR${roww} = ${n1} x R${roww} - ${n2} x R${columne}\n`);
  }
  solutionComponentsArray.push(<TransformationVisualization transformation={card} />);
  console.log('transoformation display card', card);
  // finalAns.insertAdjacentHTML('beforeend', card);
}

function rankfind() {
  let rank = 0;
  let rankcheck = 0;
  for (let g1 = 1; g1 <= row; g1++) {
    for (let g2 = 1; g2 <= col; g2++) {
      if (arr?.[g1]?.[g2] !== 0) {
        rankcheck = 1;
      }
    }
    if (rankcheck === 1) {
      rank++;
      rankcheck = 0;
    }
  }
  console.log('\nRank of Matrix is : ', rank);
  solutionComponentsArray.push(<TransformationVisualization transformation={'Rank of Matrix : '+rank} />);
  return rank;
}

function printmatrix() {
  const arrCopy = structuredClone(arr);
  let visualizationMatrix = arrCopy.filter((rowArray, rowIndex)=>{
    if(rowIndex>0 && rowIndex<=row){
      return true;
    }
    return false;
  });
  visualizationMatrix = visualizationMatrix.map((row, rowIndex)=>{
    let filteredRow = row.filter((colValue, colIndex)=>{
      if(colIndex>0 && colIndex<=col){
        return true;
      }
      return false;
    });
    return filteredRow;
  });
  solutionComponentsArray.push(<MatrixVisualization matrix={visualizationMatrix} />);
}

function main(matrix, rowval, colval) {
  arr = matrix;
  row = rowval;
  col = colval;
  solutionComponentsArray = [];
  console.log('Step-by-Step Solution: ');
  printmatrix();
  elementfind();
  lastcheck2();
  solutionComponentsArray.push(<TransformationVisualization transformation={'Final Matrix :'} />);
  printmatrix();
  const rank = rankfind();
  return [solutionComponentsArray, rank];
}

export default main;

export const MatrixVisualization = ({matrix}) =>{
  const cols = matrix[0].length;
  const rows = matrix.length;
  return (
    <ThemedView
      className={'w-64 bg-background justify-center items-center p-1  border-2  rounded-2xl  border-x-border border-y-transparent '}>
      {matrix.map((row, rowIndex) => (
        <ThemedView key={rowIndex} className={'flex-row bg-transparent '}>
          {row.map((element, colIndex) => (
            <ThemedView
              style={{
                height:rows <5 ? 50 :30,  
                width: cols<5 ? 50:30,
              }}
              key={colIndex} className={'bg-transparent  justify-center items-center'}>
              <ThemedText className={'text-lg'}>{element}</ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
      ))}
    </ThemedView>
  );
};

export const TransformationVisualization = ({transformation}) =>{
  return (
    <ThemedView  className={'p-4'}>
      <ThemedText className={'text-xl font-semibold'}>{transformation}</ThemedText>
    </ThemedView>
  );
};
