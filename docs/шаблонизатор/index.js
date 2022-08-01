let isPrinting = false
const displayedQuarters = [ true, false, false, false ]

const App = () => {
  console.log('render')
  const qs = new Array(4).fill().map((item, i) => ({
    elem: 'div',
    className: 'quarter',
    children: [
      {
        className: `quarter-inside ${
            displayedQuarters[i] ? '' : 'hidden'
        }`,
        children: [
          {
            className: 'phone-frame',
          },
          {
            className: 'ruler',
            text: 'Aa',
          },
        ]
      },
    ],
  }))
  if (isPrinting) return qs

  const selector = [
    {
      elem: 'h1',
      className: 'title',
      text: 'TemplatEngine',
    },
    {
      className: 'selector',
      children: new Array(4).fill().map((item, i) => ({
        className: `checkbox ${
          displayedQuarters[i] ? 'checked' : ''
        }`,
        click: e => {
          displayedQuarters[i] = !displayedQuarters[i]
        },
      })),
    },
    {
      elem: 'button',
      className: 'print-button',
      click: e => window.print()
    }
  ]

  return [
    {
      children: selector,
    }
  ]
}


const render = happyFramework(
  document.getElementById('root'), App
)

onbeforeprint = e => {
  isPrinting = true
  render()
}

onafterprint = e => {
  isPrinting = false
  render()
}

