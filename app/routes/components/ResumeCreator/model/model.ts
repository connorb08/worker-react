interface ResumeExperience {
    title: string
    company: string
    start: string
    end: string
}

interface ResumeStyle {
    font: string[]
    margins: {
        top: number
        bottom: number
        left: number
        right: number
    }
}

export interface ResumeProps {
    name: string
    contact_info: {
        email: string
        phone: string
    }
    links: {
        github: string
        linkedin: string
    }
    experience: ResumeExperience[]
    style: ResumeStyle
}

const voidFunc = () => {
    return
}

export class Resume implements ResumeProps {
    private updateFunction: (data: ResumeProps) => void
    public name
    public contact_info: { email: string; phone: string }
    public style: ResumeStyle
    public experience: ResumeExperience[]
    public links: { github: string; linkedin: string }

    constructor(init?: ResumeProps) {
        if (init) {
            this.name = init.name
            this.contact_info = init.contact_info
            this.style = init.style
            this.experience = init.experience
            this.links = init.links
            this.updateFunction = voidFunc
        } else {
            this.name = 'Noname'
            this.contact_info = { email: '', phone: '' }
            ;(this.style = {
                font: ['"Times New Roman"', 'sans-serif'],
                margins: {
                    top: 0.5,
                    bottom: 0.5,
                    left: 0.5,
                    right: 0.5,
                },
            }),
                (this.experience = []),
                (this.updateFunction = voidFunc),
                (this.links = { github: '', linkedin: '' })
        }
    }

    public setUpdateFunction(updateFunction: (data: ResumeProps) => void) {
        this.updateFunction = updateFunction
    }

    public commit() {
        this.updateFunction(this.toJSON())
    }

    /**
     * name
     */
    public updateMargin({
        top,
        bottom,
        left,
        right,
    }: {
        top?: number
        bottom?: number
        left?: number
        right?: number
    }) {
        if (top) this.style.margins.top = top
        if (bottom) this.style.margins.bottom = bottom
        if (left) this.style.margins.left = left
        if (right) this.style.margins.right = right
        this.commit()
    }

    toJSON(): ResumeProps {
        return {
            name: this.name,
            contact_info: this.contact_info,
            experience: this.experience,
            style: this.style,
            links: this.links,
        }
    }
}
