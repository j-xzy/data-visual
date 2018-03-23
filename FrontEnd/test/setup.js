const Enzyme = require('enzyme');
let Adapter = require('enzyme-adapter-react-16');
Enzyme.configure({ adapter: new Adapter() });
// HTMLCanvasElement.prototype.getContext = () => {
//   return {
//     font: '',
//     measureText: () => {
//       return {
//         width: '',
//       }
//     },
//     clearRect: () => { },
//     save: () => { },
//     setTransform: () => { },
//     beginPath: () => { },
//   };
// };