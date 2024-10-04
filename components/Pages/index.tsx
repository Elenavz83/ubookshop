import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';
import css from './css.module.css'
import './css.module.css'
import WindowFloat from '../Libs/WindowFloat';
import { Block } from './Block';



export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles
  let name = "خوش آمدید"




  return (
    <div style={{ direction: "rtl", minHeight: "11vh", }}>
      <br-x />

      {state.form == "bookspecs" ? <WindowFloat
        title="مشخصات کتاب" onclose={() => {
          delete state.form
          refresh()
        }}>


        <f-c>
          <f-15>نام کتاب: </f-15>
          <sp-2 />
          <f-15>{state.book.title}</f-15>
        </f-c>

        <f-c>
          <f-15>نویسنده: </f-15>
          <sp-2 />
          <f-15>{state.book.author}</f-15>
        </f-c>

        <f-c>
          <f-15>کشور: </f-15>
          <sp-2 />
          <f-15>{state.book.country}</f-15>
        </f-c>

        <f-c>
          <f-15>زبان: </f-15>
          <sp-2 />
          <f-15>{state.book.language}</f-15>
        </f-c>

        <f-c>
          <f-15>صفحات: </f-15>
          <sp-2 />
          <f-15>{(state.book.pages as number).toLocaleString("fa-IR")}</f-15>
        </f-c>

        <g-b style={{backgroundColor: "#717774"}} onClick={()=>{
          if(!state.faves)
          {
            state.faves = []
          }
          state.faves.push(state.book.title)
          state.form = null
          refresh()
        }}>
          <img src="https://irmapserver.ir/research/0/heart.png"
            style={{ height: 20, width: 20, objectFit: "contain"}} />
        </g-b >


      </WindowFloat> : null}


      <Window title={name}
        style={{ minHeight: 200, margin: 10, width: "calc(100% - 20px)" }}>
        {/* <pre style={{ direction: "ltr" }}>{JSON.stringify(props, null, 2)}</pre>
         */}

        <w-cse style={{}}>
          {props.books.map(book => {
            return <Block
              book={book}
              state={state}
              refresh={refresh}
            />
          })}
        </w-cse>
      </Window>
    </div>
  )
}


export async function getServerSideProps(context) {

  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

  let books = await global.db.collection("books").find({}).toArray()

  for (let book of books) {
    book.imageLink = "https://irmapserver.ir/research/ex/books/" + book.imageLink
  }

  console.log(books)
  return {
    props: {
      data: global.QSON.stringify({
        session,
        books
        // nlangs,
      })
    },
  }
}