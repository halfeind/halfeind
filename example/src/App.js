import React, { Component } from 'react'

import {ContainedButton, OutlineButton, TextButton} from 'halfeind';
// import {ContainedButton, TextButton} from 'halfeind';
// import { Checkbox } from 'halfeind';
import { Input, NumberInput } from 'halfeind';
import {Dropdown} from 'halfeind';
import {AccountBubble} from 'halfeind';
import { ConfirmDialog } from 'halfeind';
// import { Pane } from 'halfeind';
import { ColorPicker } from 'halfeind';
import {Switch} from 'halfeind';
// import {Style} from 'halfeind';
// import { Tag } from 'halfeind/lib/tag';
// import { Slider } from 'halfeind/lib/slider';
const options = [{key:0, value:'HalfEind'},{key:1, value:'Lyjel'},{key:2, value:'Ready Set Time'},{key:3, value:'Capital Nord'},{key:4, value:'Orellius'}]
const footerButtonsRight = [<TextButton key="ConfirmDialogButton1" uppercase>ConfirmDialogButton1</TextButton>,<TextButton key="ConfirmDialogButton2" uppercase>ConfirmDialogButton2</TextButton>];
// const footerButtonsPane = [<TextButton key="PaneButton1" uppercase>PaneButton1</TextButton>,<ContainedButton key="PaneButton2" uppercase>PaneButton2</ContainedButton>];
// import { TimePicker, TimeFormat } from 'halfeind';

export default class App extends Component {
  constructor(){
    super();
    this.state=({
      defaultSelectedKey:0,
      isChecked: true,
      modalVisible: true,
      // paneVisible: false,
      // tag1Visible: true,
      // tag2Visible: true,
      // tag3Visible: true,
    })
  } 
  render () {
    const { defaultSelectedKey,modalVisible, isChecked } = this.state;
    //const {modalVisible,paneVisible} = this.state;
    // const {tag1Visible,tag2Visible,tag3Visible} = this.state;

    return (
      <div> 
        {/* <TimePicker timeFormat={TimeFormat.HourMinuteSecond} defaultValue={"1:1:1"} /> */}
        {/* <Slider /> */}
        {/* <Tag value={23} color='#FF4532' visible={tag1Visible} onClose={()=>this.setState({
          tag1Visible:false
        })} />
        <Tag value={'test'} closable  visible={tag2Visible}onClose={()=>this.setState({
          tag2Visible:false
        })}/>
        <Tag value='12345' closable  visible={tag3Visible}onClose={()=>this.setState({
          tag3Visible:false
        })}/> */}
          <Input label='username' className='TEST123' uppercase labelColor='#ff0000' />
          <Input label='password' type='password' uppercase labelColor='#ff0000' />

        {/* <Switch activeSuffix='test' checked={isChecked} onChange={(state)=>{this.setState({isChecked:state})}}/> */}
        {/* <DatePicker showToday onChange={(month,day,year)=>console.log(month,day,year)}/> */}
        {/* <Dropdown options={options} defaultSelectedKey={defaultSelectedKey} underline  
        onKeySelected={(key)=>
            this.setState({
              defaultSelectedKey: key
             })
          }/> */}
        {/* <Pane title='Pane' description='“That proves you are unusual," returned the Scarecrow; "and I am convinced that the only people worthy of consideration in this world are the unusual ones. For the common folks are like the leaves of a tree, and live and die unnoticed.”'
          visible={paneVisible}
          
          content={[<Input label='Input' required defaultValue='Input'/>,<ColorPicker color='#FF6123' />,<ColorPicker color='#FF6123' />,<ColorPicker color='#FF6123' />,<ColorPicker color='#FF6123' />,<ColorPicker color='#FF6123' />,<ColorPicker color='#FF6123' /> ]}
          closable 
          //footerButtons={footerButtonsPane} 
          onDismiss={()=>this.setState({paneVisible:false})}
          onClose={()=>this.setState({paneVisible:false})}
        
        />
        <Input label='Input' type='password' required />
        <Input label='Input' type='number' required />
        <NumberInput label='NumberInput' /> */}
        {/* <Checkbox label='Checkbox' /> */}
        {/* <AccountBubble radius={200} label='Account Bubble' name='Account Bubble'/>
        <AccountBubble radius={100} label='Account Bubble' name='Account Bubble'/>
        <AccountBubble radius={45} label='Account Bubble' name='Mattias Verhoeven'/> */}
        <ContainedButton tabindex={10} backgroundColor='#ff0ff0' className='LULW' onClick={()=>{this.setState({isChecked:false})}}>Login</ContainedButton>
        {/* <ContainedButton tabindex={10} backgroundColor='#ff0ff0' onClick={()=>{this.setState({isChecked:false})}}>Login</ContainedButton>
        <ContainedButton backgroundColor='#ff0000' uppercase onClick={()=>{this.setState({modalVisible:true})}}>ContainedButton</ContainedButton>
        <OutlineButton borderColor='#0000ff' uppercase>OutlineButton</OutlineButton>
        <TextButton tabindex={50} textColor='#00ffff' uppercase>TextButton</TextButton> */}
          
        {/* <AccountBubble radius={45} label={<div>
          <div>Account Bubble</div>
          <Dropdown 
          underline
          options={options} 
          defaultSelectedKey={defaultSelectedKey}
          onKeySelected={(key)=>
            this.setState({
              defaultSelectedKey: key
             })
          }
          />
        </div>} labelColor='#000' name='Account Bubble' onClick={(e)=>{console.log(e)}}/> */}
          
        {/* <ContainedButton backgroundColor='#ff0000' uppercase onClick={()=>{this.setState({modalVisible:true})}}>ContainedButton</ContainedButton>
        <OutlineButton borderColor='#0000ff' uppercase>OutlineButton</OutlineButton>
        <TextButton textColor='#00ffff' uppercase>TextButton</TextButton>
        
        <Input label='Input' required />
        

          <AccountBubble radius={45} label='Account Bubble' name='Account Bubble'/>
          
        <AccountBubble radius={45} label={<div>
          <div>Account Bubble</div>
          <Dropdown 
          options={options} 
          defaultSelectedKey={defaultSelectedKey}
          onKeySelected={(key)=>
            this.setState({
              defaultSelectedKey: key
             })
          }
          />
        </div>} labelColor='#000' name='Account Bubble'/> */}
        <ConfirmDialog  title='ConfirmDialog' isBlocking description='ConfirmDialog description' closeButtonClassName='test' visible={modalVisible} closable onDismiss={()=>this.setState({modalVisible:false})} onClose={()=>this.setState({modalVisible:false})}
        footerButtons={footerButtonsRight}
                />

        {/* <ColorPicker color='#FF6123' /> */}
      </div>
    )
  }
}
