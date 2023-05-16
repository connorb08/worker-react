import type { ChangeEvent } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { BsDownload } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useLocalStorage } from '~/app/utils/hooks'
import type { ResumeProps } from './model/model'
import { Resume } from './model/model'

const ResumeHeader = (props: ResumeProps) => {
    return <></>
}

const ResumeExperience = (props: ResumeProps['experience']) => {
    return <></>
}

const LineBreak = () => {
    return <div className="border-neutral-700 my-1 mx-auto rounded" style={{ borderWidth: '1px' }} />
}

const ResumeDocument = (props: ResumeProps) => {
    // const margins = {
    //     marginTop: `calc(100%*${props.style.margins.top}/11)`,
    //     marginBottom: `calc(100%*${props.style.margins.bottom}/11)`,
    //     marginLeft: `calc(100%*${props.style.margins.left}/8.5)`,
    //     marginRight: `calc(100%*${props.style.margins.right}/8.5)`,
    // }
    const [key, setKey] = useState<number>(0)

    useEffect(() => {
        console.log('reload document')
        setKey(key + 1)
    }, [props])

    return (
        <div
            key={key}
            className="flex-1 min-w-[calc(600px)] bg-white text-black"
            style={{ aspectRatio: 8.5 / 11, fontFamily: props.style.font }}
        >
            <div
                // className="mx-[calc(100%*.5/8.5)] my-[calc(100%*.5/11)]"
                style={{
                    marginTop: `calc(100%*${props.style.margins.top}/11)`,
                    marginBottom: `calc(100%*${props.style.margins.bottom}/11)`,
                    marginLeft: `calc(100%*${props.style.margins.left}/8.5)`,
                    marginRight: `calc(100%*${props.style.margins.right}/8.5)`,
                }}
            >
                <p className="text-center text-2xl">{props.name}</p>
                <LineBreak />

                <ResumeHeader {...props} />

                <ResumeExperience {...props.experience} />
            </div>
        </div>
    )
}

const ResumeNavbar = () => {
    return (
        <div className="navbar bg-primary text-primary-content">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <a>Item 1</a>
                        </li>
                        <li tabIndex={0}>
                            <a className="justify-between">
                                Parent
                                <svg
                                    className="fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                                </svg>
                            </a>
                            <ul className="p-2">
                                <li>
                                    <a>Submenu 1</a>
                                </li>
                                <li>
                                    <a>Submenu 2</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a>Item 3</a>
                        </li>
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                    connorbray.net
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <a>Item 1</a>
                    </li>
                    <li tabIndex={0}>
                        <a>
                            Parent
                            <svg
                                className="fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                            >
                                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                            </svg>
                        </a>
                        <ul className="p-2">
                            <li>
                                <a>Submenu 1</a>
                            </li>
                            <li>
                                <a>Submenu 2</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a>Item 3</a>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn text-primary-content">
                    Download{' '}
                    <span className="pl-4">
                        <BsDownload />
                    </span>
                </a>
            </div>
        </div>
    )
}

const ResumeCreator = () => {
    const resumetemp = new Resume()
    const [resumeData, setResumeData] = useLocalStorage<ResumeProps>('resumeData', resumetemp)
    const resume = new Resume(resumeData)
    resume.setUpdateFunction(setResumeData)

    const update = () => {
        resume.commit()
    }

    const handleMarginChange = (location: string, event: ChangeEvent<HTMLInputElement>) => {
        if (location === 'top') resume.style.margins.top = Number(event.target.value)
        if (location === 'bottom') resume.style.margins.bottom = Number(event.target.value)
        if (location === 'left') resume.style.margins.left = Number(event.target.value)
        if (location === 'right') resume.style.margins.right = Number(event.target.value)
        // console.log(event.target.value)

        update()
    }

    const handleFontChange = (font: string[]) => {
        resume.style.font = font
        update()
    }

    return (
        <div className="min-h-screen">
            <ResumeNavbar />
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col text-center p-10">
                    <h1>Info</h1>
                    <section className="mt-4">
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">What is your name?</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Who are you??"
                                className="input input-bordered w-full max-w-xs"
                                value={resume.name}
                                onChange={(e) => {
                                    resume.name = String(e.target.value)
                                    update()
                                }}
                            />
                        </div>
                    </section>
                    <h1>Style</h1>

                    <section className="mt-4">
                        <h2>Margins</h2>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Margins</span>
                            </label>
                            <label className="input-group">
                                <span>Top</span>
                                <input
                                    type="number"
                                    step=".25"
                                    min="0"
                                    max="2"
                                    placeholder="Margin top"
                                    className="input input-bordered w-full max-w-xs"
                                    value={resume.style.margins.top}
                                    onChange={(event) => {
                                        handleMarginChange('top', event)
                                    }}
                                />
                                <span>Bottom</span>
                                <input
                                    type="number"
                                    step=".25"
                                    min="0"
                                    max="2"
                                    placeholder="Margin Bottom"
                                    className="input input-bordered w-full max-w-xs"
                                    value={resume.style.margins.bottom}
                                    onChange={(event) => {
                                        handleMarginChange('bottom', event)
                                    }}
                                />
                                <span>Left</span>
                                <input
                                    type="number"
                                    step=".25"
                                    min="0"
                                    max="2"
                                    placeholder="Margin Left"
                                    className="input input-bordered w-full max-w-xs"
                                    value={resume.style.margins.left}
                                    onChange={(event) => {
                                        handleMarginChange('left', event)
                                    }}
                                />
                                <span>Right</span>
                                <input
                                    type="number"
                                    step=".25"
                                    min="0"
                                    max="2"
                                    placeholder="Margin Right"
                                    className="input input-bordered w-full max-w-xs"
                                    value={resume.style.margins.right}
                                    onChange={(event) => {
                                        handleMarginChange('right', event)
                                    }}
                                />
                            </label>
                        </div>
                    </section>

                    <section className="mt-4">
                        <h2>Fonts</h2>
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Times New Roman</span>
                                <input
                                    type="radio"
                                    name="radio-10"
                                    className="radio checked:bg-primary"
                                    onClick={() => {
                                        handleFontChange(['"Times New Roman"', 'sans-serif'])
                                    }}
                                    checked={resumeData.style.font[0] === '"Times New Roman"'}
                                />
                            </label>
                            <label className="label cursor-pointer">
                                <span className="label-text">Source Code Pro</span>
                                <input
                                    type="radio"
                                    name="radio-10"
                                    className="radio checked:bg-primary"
                                    onClick={() => {
                                        handleFontChange(['"Source Code Pro"', 'monospace'])
                                    }}
                                    checked={resumeData.style.font[0] === '"Source Code Pro"'}
                                />
                            </label>
                        </div>
                    </section>
                </div>
                <div className="flex p-10">
                    <ResumeDocument
                        name={resume.name}
                        contact_info={resume.contact_info}
                        links={resume.links}
                        experience={[]}
                        style={resume.style}
                    />
                </div>
            </div>
        </div>
    )
}

export default ResumeCreator
