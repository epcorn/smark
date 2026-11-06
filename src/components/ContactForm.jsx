import { Box, Button, MenuItem, styled, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { MdSend } from 'react-icons/md';

const VisuallyHiddenInput = styled('input')({
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function ContactForm({ sendMail }) {
  const [change, setChange] = useState({ currentStatus: false, areaOfInterest: false });
  const [fileName, setFileName] = useState("");

  const currStatus = [
    { value: "Student", label: "Student" },
    { value: "Fresh Graduate", label: "Fresh Graduate" },
    { value: "Currently Employed", label: "Currently Employed" },
    { value: "Research Scholar", label: "Research Scholar" },
    { value: "Self-Employed", label: "Self-Employed" },
    { value: "other", label: "Other" },
  ];

  const areaOfInt = [
    { value: "Product development", label: "Product development" },
    { value: "Product licensing", label: "Product licensing" },
    { value: "Technical pest management services", label: "Technical pest management services" },
    { value: "Training research", label: "Training research" },
    { value: "Technology development", label: "Technology development" },
    { value: "Institutional collaboration", label: "Institutional collaboration" },
    { value: "Industry partnerships", label: "Industry partnerships" },
    { value: "Innovation projects", label: "Innovation projects" },
    { value: "other", label: "Other" },
  ];

  const onChange = (e, name) => {
    const isOther = e.target.value === "other";
    setChange(prev => ({ ...prev, [name]: isOther }));
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <Box
      className='shadow-xl my-10 p-6 sm:p-8 max-w-2xl mx-auto rounded-xl bg-white'
      sx={{ border: '1px solid', borderColor: 'divider' }}
    >
      <Typography variant='h5' sx={{ mb: 1, textAlign: "center", fontWeight: 600, color: 'text.primary' }}>
        Join S Mark
      </Typography>
      <Typography variant='body2' sx={{ mb: 4, textAlign: "center", color: 'text.secondary' }}>
        Fill out the form below to apply for a position with our team.
      </Typography>

      <Box
        component="form"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 3,
          alignItems: "start"
        }}
        onSubmit={sendMail}
      >
        <InputField label={'Name'} name={'name'} type="text" required />
        <InputField label={'Email id'} name={'email'} type="email" required />
        <InputField label={'Contact No'} name={'contact'} type="tel" required />
        <InputField label={'City'} name={'city'} required type="text" />

        <Box sx={{ gridColumn: { sm: "span 2" } }}>
          <InputField label={'Qualification'} required name={'qualification'} type="text" />
        </Box>

        {/* Current Status Field & Conditional Custom Input */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end', gridColumn: { sm: "span 2" } }}>
          {!change.currentStatus ? (
            <Box sx={{ flex: '1 1 100%' }}>
              <InputSelect label={'Current Status'} options={currStatus} name='currentStatus' onChange={onChange} required />
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'end', gap: 1, flex: '1 1 100%' }}>
              <Typography
                sx={{
                  whiteSpace: 'nowrap',
                  color: 'primary.main',
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontSize: "1.2rem",
                  '&:hover': { textDecoration: 'underline' }
                }}
                className='px-0'
                onClick={() => setChange(prev => ({ ...prev, currentStatus: false }))}
                title="Click to go back to options"
              >
                Other:
              </Typography>
              <InputField label={'Specify Current Status'} name={'currentStatusCustom'} type="text" required />
            </Box>
          )}
        </Box>

        {/* Area of Interest Field & Conditional Custom Input */}
        {/* Current Status Field & Conditional Custom Input */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end', gridColumn: { sm: "span 2" } }}>
          {!change.areaOfInterest ? (
            <Box sx={{ flex: '1 1 100%' }}>
              <InputSelect label={'Area of Interest'} options={areaOfInt} name='areaOfInterest' onChange={onChange} required />
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'end', gap: 1, flex: '1 1 100%' }}>
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: 'nowrap',
                  color: 'primary.main',
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontSize: "1.2rem",
                  '&:hover': { textDecoration: 'underline' }
                }}
                className='px-0'
                onClick={() => setChange(prev => ({ ...prev, areaOfInterest: false }))}
                title="Click to go back to options"
              >
                Other:
              </Typography>
              <InputField label={'Specify Area of Interest'} name={'areaOfInterestCustom'} type="text" required />
            </Box>
          )}
        </Box>

        {/* File Upload Section spanning full width for better alignment */}
        <Box sx={{ gridColumn: { sm: "span 2" }, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button
            component="label"
            variant="outlined"
            tabIndex={-1}
            startIcon={<FaUpload />}
            fullWidth
            sx={{ py: 1.2, textTransform: 'none', borderStyle: 'dashed', borderWidth: 2 }}
          >
            {fileName ? "Change Resume" : "Select Resume (PDF / DOCX)"}
            <VisuallyHiddenInput
              type="file"
              name='resume'
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              required
            />
          </Button>
          {fileName ? (
            <Typography variant="caption" color="success.main" sx={{ pl: 1, fontWeight: 500 }}>
              ✓ Selected file: {fileName}
            </Typography>
          ) : (
            <Typography variant="caption" color="text.secondary" sx={{ pl: 1 }}>
              Please upload your resume file.
            </Typography>
          )}
        </Box>

        {/* Submit Button */}
        <Box sx={{ gridColumn: { sm: "span 2" }, mt: 2 }}>
          <Button
            type='submit'
            variant='contained'
            fullWidth
            sx={{ py: 1.5, fontSize: '1rem', fontWeight: 600, textTransform: 'none', boxShadow: 3 }}
            endIcon={<MdSend />}
          >
            Submit Application
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ContactForm;

function InputField({ type = "text", name, label, required }) {
  return (
    <TextField
      type={type}
      name={name}
      fullWidth
      required={required}
      id={`standard-${name}`}
      label={label}
      variant="standard"
    />
  );
}

function InputSelect({ label, options, name, required, onChange }) {
  return (
    <TextField
      select
      fullWidth
      name={name}
      label={label}
      required={required}
      defaultValue=""
      variant="standard"
      onChange={(e) => onChange(e, name)}
    >
      {options?.map(op => (
        <MenuItem key={op.value} value={op.value}>
          {op.label}
        </MenuItem>
      ))}
    </TextField>
  );
}