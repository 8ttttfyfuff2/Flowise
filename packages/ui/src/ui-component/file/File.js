import { useState } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import { FormControl, Button } from '@mui/material'
import { IconUpload } from '@tabler/icons'
import { getFileName } from 'utils/genericHelper'

export const File = ({ value, fileType, onChange, disabled = false }) => {
    const theme = useTheme()

    const [myValue, setMyValue] = useState(value ?? '')

    const handleFileUpload = (e) => {
        if (!e.target.files) return

        const file = e.target.files[0]
        const { name } = file

        const reader = new FileReader()
        reader.onload = (evt) => {
            if (!evt?.target?.result) {
                return
            }
            const { result } = evt.target

            const value = result + `,filename:${name}`

            setMyValue(value)
            onChange(value)
        }
        reader.readAsDataURL(file)
    }

    return (
        <FormControl sx={{ mt: 1, width: '100%' }} size='small'>
            <span
                style={{
                    fontStyle: 'italic',
                    color: theme.palette.grey['800'],
                    marginBottom: '1rem'
                }}
            >
                {myValue ? getFileName(myValue) : 'Choose a file to upload'}
            </span>
            <Button
                disabled={disabled}
                variant='outlined'
                component='label'
                fullWidth
                startIcon={<IconUpload />}
                sx={{ marginRight: '1rem' }}
            >
                {'Upload File'}
                <input type='file' accept={fileType} hidden onChange={(e) => handleFileUpload(e)} />
            </Button>
        </FormControl>
    )
}

File.propTypes = {
    value: PropTypes.string,
    fileType: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool
}
