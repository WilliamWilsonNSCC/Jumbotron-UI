import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {useForm} from 'react-hook-form'


function Purchase() {
    const { id } = useParams()
    const {register, handleSubmit} = useForm()
    // apiUrl should be the base for shows, e.g. '/api/shows' so we can POST to '/:id/purchases'
    const apiUrl = import.meta.env.VITE_SHOWS_API_URL

    const onSubmit = async(data) => {
        Console.log(data)

        setResult(null)
        const errs = validate()
        setErrors(errs)
        if (Object.keys(errs).length > 0) return

        setSubmitting(true)
        try {
            // Payload shaped to match your C# Purchase model
            // backend expects POST to /:id/purchases with body keys: ticketSales, name, email, paymentType, cardNumber, cvv
            const payload = {
                ticketSales: Number(form.TicketSales),
                name: form.Name,
                email: form.Email,
                paymentType: form.PaymentType,
                cardNumber: form.CardNumber.replace(/\s+/g, ''),
                cvv: form.CVV ? Number(form.CVV) : null
            }

            const apiBaseClean = apiUrl ? apiUrl.replace(/\/$/, '') : apiUrl
            const endpoint = `${apiBaseClean}/${Number(form.ShowId)}/purchases`
            console.log('POSTing purchase to:', endpoint)
            const resp = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            const data = await resp.json().catch(() => null)

            if (resp.ok) {
                setResult({ success: true, message: data?.message || 'Purchase complete. Check your email for confirmation.' })
                setForm(prev => ({ ...prev, tickets: 1, cardNumber: '', cardCvv: '', cardExpiry: '' }))
            } else {
                setResult({ success: false, message: data?.error || data?.message || 'Purchase failed. Please try again.' })
            }
        } catch (err) {
            setResult({ success: false, message: 'Network error. Please try again later.' })
        } finally {
            setSubmitting(false)
        }
    }
    const [form, setForm] = useState({
        ShowId: Number(id) || 0,
        TicketSales: '',
        Name: '',
        Email: '',
        Phone: '',
        PaymentType: 'Card',
        CardNumber: '',
        ExpirationDate: '',
        CVV: ''
    })

    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [result, setResult] = useState(null)

    function handleChange(e) {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    function validate() {
        const errs = {}
        if (!form.ShowId || Number(form.ShowId) === 0) errs.ShowId = 'Event ID is required.'
        if (!form.TicketSales || Number(form.TicketSales) < 1) errs.TicketSales = 'Please order at least 1 ticket.'
        if (!form.Name || form.Name.trim().length < 2) errs.Name = 'Please enter your full name.'
        if (!form.Email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.Email)) errs.Email = 'Please enter a valid email.'
        if (!form.CardNumber || !/^\d{16}$/.test(form.CardNumber.replace(/\s+/g, ''))) errs.CardNumber = 'Enter a valid card number (16 digits).'
        if (!form.CVV || !/^\d{3,4}$/.test(String(form.CVV))) errs.CVV = 'Enter a 3 or 4 digit CVV.'
        if (!form.ExpirationDate || !/^\d{2}\/\d{2,4}$/.test(form.ExpirationDate)) errs.ExpirationDate = 'Expiry must be in MM/YY or MM/YYYY format.'
        return errs
    }

    // async function onSubmit(e) {
    //     e.preventDefault()
    //     setResult(null)
    //     const errs = validate()
    //     setErrors(errs)
    //     if (Object.keys(errs).length > 0) return

    //     setSubmitting(true)
    //     try {
    //         // Payload shaped to match your C# Purchase model
    //         // backend expects POST to /:id/purchases with body keys: ticketSales, name, email, paymentType, cardNumber, cvv
    //         const payload = {
    //             ticketSales: Number(form.TicketSales),
    //             name: form.Name,
    //             email: form.Email,
    //             paymentType: form.PaymentType,
    //             cardNumber: form.CardNumber.replace(/\s+/g, ''),
    //             cvv: form.CVV ? Number(form.CVV) : null
    //         }

    //         const apiBaseClean = apiUrl ? apiUrl.replace(/\/$/, '') : apiUrl
    //         const endpoint = `${apiBaseClean}/${Number(form.ShowId)}/purchases`
    //         console.log('POSTing purchase to:', endpoint)
    //         const resp = await fetch(endpoint, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(payload)
    //         })

    //         const data = await resp.json().catch(() => null)

    //         if (resp.ok) {
    //             setResult({ success: true, message: data?.message || 'Purchase complete. Check your email for confirmation.' })
    //             setForm(prev => ({ ...prev, tickets: 1, cardNumber: '', cardCvv: '', cardExpiry: '' }))
    //         } else {
    //             setResult({ success: false, message: data?.error || data?.message || 'Purchase failed. Please try again.' })
    //         }
    //     } catch (err) {
    //         setResult({ success: false, message: 'Network error. Please try again later.' })
    //     } finally {
    //         setSubmitting(false)
    //     }
    // }

    return (
        <>
            <p><Link to={`/details/${id}`}>← Back to Event</Link></p>

            <h2>Purchase Tickets</h2>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                
                    <div class="form-group row">
                        <label for="ShowId" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" name="ShowId" value={form.ShowId} onChange={handleChange}/>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="TicketSales" class="col-sm-2 col-form-label">Number of Tickets</label>
                        <input name="TicketSales" type="number" min="1" value={form.TicketSales} onChange={handleChange} />
                        {errors.TicketSales && <div className="error">{errors.TicketSales}</div>}
                    </div>
                
                <fieldset class="form-group">
                    <legend class="col-form-label col-sm-2 pt-0">Customer Details</legend>
                    <div class="form-group row">
                        <label for="Name" class="col-sm-2 col-form-label">Full name</label>
                        <div class="col-sm-10">    
                            <input name="Name" value={form.Name} onChange={handleChange} />
                        </div>
                        {errors.Name && <div className="error">{errors.Name}</div>}
                    </div>
                    <div class="form-group row">
                        <label for="Email" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">   
                            <input name="Email" type="email" value={form.Email} onChange={handleChange} />
                        </div>
                        {errors.Email && <div className="error">{errors.Email}</div>}
                    </div>
                    </fieldset>

                    <fieldset class="form-group">
                    <legend class="col-form-label col-sm-2 pt-0">Payment Details</legend>
                    <div class="form-group row">
                        <label for="PaymentType" class="col-sm-2 col-form-label">Payment Type</label>
                        <div class="col-sm-10">    
                            <select name="PaymentType" value={form.PaymentType} onChange={handleChange}>
                                <option value="Card">Card</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="CardNumber" class="col-sm-2 col-form-label">Card number</label>
                        <div class="col-sm-10">  
                            <input name="CardNumber" value={form.CardNumber} onChange={handleChange} placeholder="4242 4242 4242 4242" />
                        </div>
                        {errors.CardNumber && <div className="error">{errors.CardNumber}</div>}
                    </div>
                    <div class="form-group row">
                        <label for="ExpirationDate" class="col-sm-2 col-form-label">Expiry (MM/YY)</label>
                        <div class="col-sm-10">
                            <input name="ExpirationDate" value={form.ExpirationDate} onChange={handleChange} placeholder="MM/YY" />
                        </div>
                        {errors.ExpirationDate && <div className="error">{errors.ExpirationDate}</div>}
                    </div>
                    <div class="form-group row">
                        <label for="CVV" class="col-sm-2 col-form-label">CVV</label>
                        <div class="col-sm-10">
                            <input name="CVV" value={form.CVV} onChange={handleChange} placeholder="123" />
                        </div>
                        {errors.CVV && <div className="error">{errors.CVV}</div>}
                    </div>
                </fieldset>

                <div class="form-group row">
                    <button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Buy Tickets'}</button>
                </div>
            </form>

            {result && (
                <div className={result.success ? 'success' : 'error'}>
                    <p>{result.message}</p>
                    {result.success && <p>Next steps: check your email for a receipt and QR-coded tickets.</p>}
                </div>
            )}
        </>
    )
}

export default Purchase